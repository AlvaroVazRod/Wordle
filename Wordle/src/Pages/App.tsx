import React, { useState } from "react";
import { KeyBoard } from "../Components/KeyBoard/KeyBoard";
import { Board } from "../Components/Boards/Board";
const NUM_ROWS = 6;
const NUM_COLS = 5;
function App() {
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: NUM_ROWS }, () => Array(NUM_COLS).fill(''))
      );
      const [currentRow, setCurrentRow] = useState(0);
      const [currentCol, setCurrentCol] = useState(0);
    
      const handleKeyPress = (letter: string) => {
        if (currentCol >= NUM_COLS || currentRow >= NUM_ROWS) return;
    
        const newBoard = board.map((row, i) =>
          i === currentRow ? [...row] : row
        );
        newBoard[currentRow][currentCol] = letter.toUpperCase();
        setBoard(newBoard);
        setCurrentCol(currentCol + 1);
      };
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 gap-6">
            <h1 className="text-3xl font-bold mb-4">Wordle</h1>
            <Board character={board} />
            <KeyBoard onButtonPress={handleKeyPress} />
        </div>
    );
}
export default App;