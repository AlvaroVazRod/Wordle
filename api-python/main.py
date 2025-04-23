from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PalabraRequest, PalabraResponse, ResultadoResponse
from game_logic import validar_palabra
from fastapi import Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from database import SessionLocal, get_async_session
from models import Palabra, PalabraCorta, PalabraMedia, PalabraLarga
from random import randint
from pydantic import BaseModel
app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/comprobar_palabra", response_model=ResultadoResponse)
def comprobar_palabra(req: PalabraRequest):
    resultado = validar_palabra(req.intento.lower(), req.solucion.lower())
    return {"resultado": resultado}

async def get_db():
    async with SessionLocal() as session:
        yield session
        
@app.get("/api/validar/{palabra}")
async def validar_palabra_correcta(
    palabra: str,
    dificultad: str = Query("normal", enum=["facil", "normal", "dificil"]),
    session: AsyncSession = Depends(get_async_session)
):
    palabra = palabra.lower()

    modelo = {
        "facil": PalabraCorta,
        "normal": PalabraMedia,
        "dificil": PalabraLarga,
    }[dificultad]

    result = await session.execute(select(modelo).where(modelo.texto == palabra))
    existe = result.scalars().first()
    return {"valida": bool(existe)}


@app.get("/api/obtener_palabra", response_model=PalabraResponse)
async def obtener_palabra(
    dificultad: str = Query("normal", enum=["facil", "normal", "dificil"]),
    db: AsyncSession = Depends(get_db)
):
    modelo = {
        "facil": PalabraCorta,
        "normal": PalabraMedia,
        "dificil": PalabraLarga,
    }[dificultad]

    result = await db.execute(select(func.count()).select_from(modelo))
    total = result.scalar()

    if total == 0:
        return {"palabra": "error"}

    offset = randint(0, total - 1)
    result = await db.execute(select(modelo.texto).offset(offset).limit(1))
    palabra = result.scalar()

    return {"palabra": palabra}