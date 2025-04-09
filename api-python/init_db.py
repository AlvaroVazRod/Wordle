import asyncio
from database import engine
from models import Base, Palabra
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    palabras = ["nubesd", "perrof", "sillaf", "luzcof", "mismof", "cantof", "mañana"]
    async with engine.begin() as conn:
        for palabra in palabras:
            result = await conn.execute(select(Palabra).filter_by(texto=palabra))
            if not result.scalars().first():
                await conn.execute(
                    Palabra.__table__.insert().values(texto=palabra)
                )

if __name__ == "__main__":
    asyncio.run(init_db())
