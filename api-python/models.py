from pydantic import BaseModel
from typing import List, Literal
from sqlalchemy import Column, Integer, String
from database import Base

CellStatus = Literal["correct", "present", "absent"]
class Palabra(Base):
    __tablename__ = "palabras"
    id = Column(Integer, primary_key=True, index=True)
    texto = Column(String, unique=True, index=True)
    
class PalabraRequest(BaseModel):
    intento: str
    solucion: str

class PalabraResponse(BaseModel):
    resultado: List[CellStatus]
