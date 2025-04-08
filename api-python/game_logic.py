from typing import List, Literal

CellStatus = Literal["correct", "present", "absent"]

def validar_palabra(intento: str, solucion: str) -> List[CellStatus]:
    resultado: List[CellStatus] = ["absent"] * len(intento)
    solucion_lista = list(solucion)
    usado = [False] * len(solucion)

    # Primera pasada: letras correctas
    for i, letra in enumerate(intento):
        if letra == solucion[i]:
            resultado[i] = "correct"
            usado[i] = True

    # Segunda pasada: letras presentes mal ubicadas
    for i, letra in enumerate(intento):
        if resultado[i] == "correct":
            continue
        for j, sol_letra in enumerate(solucion_lista):
            if letra == sol_letra and not usado[j]:
                resultado[i] = "present"
                usado[j] = True
                break

    return resultado
