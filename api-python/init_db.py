import asyncio
import json
from sqlite3 import IntegrityError
from database import engine
from models import Base, PalabraCorta, PalabraMedia, PalabraLarga
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

def clasificar_palabra(palabra):
    longitud = len(palabra)
    if 3 <= longitud <= 4:
        return 'corta'
    elif 5 <= longitud <= 7:
        return 'media'
    elif longitud >= 8:
        return 'larga'
    return None

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    with open("words_dictionary.json", "r") as file:
        palabras_dict = json.load(file)
        palabras = list(palabras_dict.keys())

    data_corta = [{"texto": p} for p in palabras if clasificar_palabra(p) == 'corta']
    data_media = [{"texto": p} for p in palabras if clasificar_palabra(p) == 'media']
    data_larga = [{"texto": p} for p in palabras if clasificar_palabra(p) == 'larga']

    async with engine.begin() as session:
        try:
            await session.execute(
                PalabraCorta.__table__.insert().prefix_with("OR IGNORE"), data_corta
            )
            await session.execute(
                PalabraMedia.__table__.insert().prefix_with("OR IGNORE"), data_media
            )
            await session.execute(
                PalabraLarga.__table__.insert().prefix_with("OR IGNORE"), data_larga
            )
            await session.commit()
        except IntegrityError:
            await session.rollback()

if __name__ == "__main__":
    asyncio.run(init_db())
