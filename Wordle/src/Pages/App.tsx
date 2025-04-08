import React, { useState, useEffect  } from "react";
import { KeyBoard } from "../Components/KeyBoard/KeyBoard";
import { Board } from "../Components/Boards/Board";
import './App.css';
const NUM_ROWS = 6;
const NUM_COLS = 5;

function App() {
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(''))
      );
      const [animatedCell, setAnimatedCell] = useState<{ row: number; col: number } | undefined>(undefined);
      const [currentRow, setCurrentRow] = useState(0);
      const [currentCol, setCurrentCol] = useState(0);
      const [word, setWord] = useState('');
      const handleKeyPress = (letter: string) => {
        if (currentCol >= NUM_COLS || currentRow >= NUM_ROWS) return;
    
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
        if (currentCol>0) {
            const newBoard = board.map((row,i)=>
             i=== currentRow ? [...row]: row
            );
            newBoard[currentRow][currentCol-1] = '';
            setBoard(newBoard);
            setCurrentCol(currentCol-1);
        }
      }
      const handleEnter = () =>{
        if (currentCol< NUM_COLS) {
            alert('No hay suficientes letras');
            return;
        }
        alert(`Palabra ${board[currentRow].join(' ')} enviada`);
        setCurrentRow(currentRow-1);
        setCurrentCol(0);
      }
      useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
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
      }, [board, currentCol, currentRow]);
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 gap-6">
            <h1 className="text-3xl font-bold mb-4">Wordle</h1>
            <Board character={board} animatedCell={animatedCell} />
            <KeyBoard onButtonPress={handleKeyPress} 
            onBackSpace={handleBackSpace}
            onEnter={handleEnter}/>
        </div>
    );
}
export default App;