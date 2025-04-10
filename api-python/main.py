from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import PalabraRequest, PalabraResponse
from game_logic import validar_palabra
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select
from database import SessionLocal
from models import Palabra
from random import randint
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/comprobar_palabra", response_model=PalabraResponse)
def comprobar_palabra(req: PalabraRequest):
    resultado = validar_palabra(req.intento.lower(), req.solucion.lower())
    return {"resultado": resultado}

class PalabraResponse(BaseModel):
    palabra: str

async def get_db():
    async with SessionLocal() as session:
        yield session

@app.get("/api/obtener_palabra", response_model=PalabraResponse)
async def obtener_palabra(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(func.count()).select_from(Palabra))
    total = result.scalar()

    if total == 0:
        return {"palabra": "error"}

    offset = randint(0, total - 1)
    result = await db.execute(select(Palabra.texto).offset(offset).limit(1))
    palabra = result.scalar()

    return {"palabra": palabra}