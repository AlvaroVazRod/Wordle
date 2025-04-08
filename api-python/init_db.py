import asyncio
from database import engine
from models import Base, Palabra

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)  # prueba
        await conn.run_sync(Base.metadata.create_all)

    palabras = ["nubes", "perro", "silla", "luzco", "mismo", "canto"]
    async with engine.begin() as conn:
        for palabra in palabras:
            await conn.execute(
                Palabra.__table__.insert().values(texto=palabra)
            )

if __name__ == "__main__":
    asyncio.run(init_db())
