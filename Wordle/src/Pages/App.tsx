import React, { useState, useEffect } from "react";
import { KeyBoard } from "../Components/KeyBoard/KeyBoard";
import { Board } from "../Components/Boards/Board";
import { RespuestaComprobacion, RespuestaPalabra } from "../Types/types";
import { SlabStatus } from '../Types/types';
import './App.css';
import { Toaster, toast } from 'react-hot-toast';

const NUM_ROWS = 6;

function App() {
  const [word, setWord] = useState('');
  const numCols = React.useMemo(() => word.length, [word]);
  const [board, setBoard] = useState<string[][]>([]);
  const [animatedCell, setAnimatedCell] = useState<{ row: number; col: number } | undefined>(undefined);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [statusMatrix, setStatusMatrix] = useState<SlabStatus[][]>([]);
  const [keyStatus, setKeyStatus] = useState<Record<string, SlabStatus>>({});
  const [isGameOver, setIsGameOver] = useState(false);

  const obtenerPalabra = async (dificultad = "normal") => {
    try {
      const response = await fetch(`http://localhost:8000/api/obtener_palabra?dificultad=${dificultad}`);
      const data: RespuestaPalabra = await response.json();
      setWord(data.palabra);
    } catch (error) {
      console.error("Error al obtener la palabra", error);
    }
  }

  useEffect(() => {
    const dificultad = localStorage.getItem("dificultad") ?? "normal";
    obtenerPalabra(dificultad);
  }, []);

  const reiniciarJuego = async () => {
    setIsGameOver(false);
    const dificultad = localStorage.getItem("dificultad") ?? "normal";
    await obtenerPalabra(dificultad);
  }

  useEffect(() => {
    if (!word) return;
    const cols = word.length;
    setBoard(Array.from({ length: NUM_ROWS }, () => Array(cols).fill('')));
    setStatusMatrix(Array.from({ length: NUM_ROWS }, () => Array(cols).fill('')));
    setCurrentRow(0);
    setCurrentCol(0);
    setKeyStatus({});
    console.log("Palabra:", word);
  }, [word]);

  const handleKeyPress = (letter: string) => {
    if (isGameOver) return;
    if (currentCol >= numCols || currentRow >= NUM_ROWS) return;
    if (!/^[a-zñ]$/i.test(letter)) return;

    const newBoard = board.map((row, i) =>
      i === currentRow ? [...row] : row
    );
    newBoard[currentRow][currentCol] = letter.toUpperCase();
    setBoard(newBoard);
    setAnimatedCell({ row: currentRow, col: currentCol });
    setTimeout(() => setAnimatedCell(undefined), 1000);
    setCurrentCol(currentCol + 1);
  };

  const handleBackSpace = () => {
    if (isGameOver) return;
    if (currentCol > 0) {
      const newBoard = board.map((row, i) =>
        i === currentRow ? [...row] : row
      );
      newBoard[currentRow][currentCol - 1] = '';
      setBoard(newBoard);
      setCurrentCol(currentCol - 1);
    }
  }

  async function validarPalabra(palabra: string): Promise<boolean> {
    if (palabra.length !== word.length) {
      toast("La palabra debe tener exactamente " + word.length + " letras.");
      return false;
    }

    try {
      const dificultad = localStorage.getItem("dificultad") ?? "normal";
      const res = await fetch(`http://localhost:8000/api/validar/${palabra}?dificultad=${dificultad}`);

      if (!res.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await res.json();
      return data.valida ?? false;

    } catch (error) {
      console.error('Error al validar la palabra:', error);
      return false;
    }
  }

  const handleEnter = async () => {
    if (isGameOver || !board.length || !board[0].length) return;
    if (currentCol < numCols) {
      toast("No hay suficientes letras.");
      return;
    }

    const palabraJugada = board[currentRow].join('').toLowerCase();
    const esValida = await validarPalabra(palabraJugada);
    if (!esValida) {
      toast("Esa no es una palabra válida");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/comprobar_palabra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ intento: palabraJugada, solucion: word }),
      });

      if (!response.ok) {
        throw new Error("Conexion Fallida");
      }

      const data = await response.json();
      const result = data.resultado as SlabStatus[];

      const newStatusMatrix = statusMatrix.map((row, i) =>
        i === currentRow ? result : row
      );
      setStatusMatrix(newStatusMatrix);

      const newKeyStatus = { ...keyStatus };
      result.forEach((status, index) => {
        const letter = palabraJugada[index];
        if (newKeyStatus[letter] !== 'correct') {
          newKeyStatus[letter] = status;
        }
      });
      palabraJugada.split('').forEach(letter => {
        if (!newKeyStatus[letter]) {
          newKeyStatus[letter] = 'absent';
        }
      });
      setKeyStatus(newKeyStatus);

      if (palabraJugada === word.toLowerCase()) {
        toast.success("🎉 ¡Correcto! ¡Ganaste!");
        setIsGameOver(true);
      } else if (currentRow === NUM_ROWS - 1) {
        toast.error(`❌ Fallaste. La palabra era: ${word}`);
        setIsGameOver(true);
      }

      setCurrentRow(currentRow + 1);
      setCurrentCol(0);
    } catch (error) {
      console.error("Error al comprobar la palabra:", error);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;

      if (e.key === "Enter") {
        handleEnter();
      } else if (e.key === "Backspace") {
        handleBackSpace();
      } else if (/^[a-zñ]$/i.test(e.key)) {
        handleKeyPress(e.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board, currentCol, currentRow, isGameOver]);

  if (!word || numCols === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold mb-4">Wordle</h1>

      <Board character={board} animatedCell={animatedCell} statusMatrix={statusMatrix} />

      {!isGameOver && (
        <KeyBoard
          onButtonPress={handleKeyPress}
          onBackSpace={handleBackSpace}
          onEnter={handleEnter}
          keyStatus={keyStatus}
          isGameOver={isGameOver}
        />
      )}

      <button
        onClick={reiniciarJuego}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-600"
      >
        Reiniciar Juego
      </button>

      {isGameOver && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-2xl font-bold">
          ¡Juego Terminado!
        </div>
      )}

      <Toaster
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
