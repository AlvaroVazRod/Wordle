from pydantic import BaseModel
from typing import List, Literal
from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class PalabraCorta(Base):
    __tablename__ = "palabras_cortas"
    id = Column(Integer, primary_key=True)
    texto = Column(String, unique=True, nullable=False)

class PalabraMedia(Base):
    __tablename__ = "palabras_medias"
    id = Column(Integer, primary_key=True)
    texto = Column(String, unique=True, nullable=False)

class PalabraLarga(Base):
    __tablename__ = "palabras_largas"
    id = Column(Integer, primary_key=True)
    texto = Column(String, unique=True, nullable=False)

CellStatus = Literal["correct", "present", "absent"]

class Palabra(Base):
    __tablename__ = "palabras"
    id = Column(Integer, primary_key=True, index=True)
    texto = Column(String, unique=True, index=True)
    
class PalabraRequest(BaseModel):
    intento: str
    solucion: str

class PalabraResponse(BaseModel):
    palabra: str

class ResultadoResponse(BaseModel):
    resultado: List[CellStatus]

