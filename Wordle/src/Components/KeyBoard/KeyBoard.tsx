import { Board } from "../Boards/Board";
import React from "react";
interface boardProps {
    onButtonPress: (letter: string) => void;
    onBackSpace: () => void;
    onEnter: () => void;
};

export const KeyBoard: React.FC<boardProps> = ({ onButtonPress, onBackSpace, onEnter }) => {
    const rows = ['qwertyuiop', 'asdfghjklñ' ];
    const lastRows = "zxcvbnm";
    return (
        <div className="grid gap-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.split('').map((character) => (
              <button
                key={character}
                onClick={() => onButtonPress(character)}
                className="bg-gray-600 px-3 py-2 rounded text-white font-semibold hover:bg-gray-500"
              >
                {character}
              </button>
            ))}
          </div>
        ))}
  
        {/* Última fila con Enter y Borrar dentro de las letras */}
        <div key={3} className="flex gap-2 justify-center">
          {lastRows.split('').map((character) => (
            <button
              key={character}
              onClick={() => onButtonPress(character)}
              className="bg-gray-600 px-3 py-2 rounded text-white font-semibold hover:bg-gray-500"
            >
              {character}
            </button>
          ))}
  
          {/* Botón Borrar */}
          <button
            onClick={onBackSpace}
            className="bg-gray-600 px-3 py-2 rounded text-white font-semibold hover:bg-gray-500"
          >
            Borrar
          </button>
  
          {/* Botón Enter */}
          <button
            onClick={onEnter}
            className="bg-gray-600 px-6 py-2 rounded text-white font-semibold hover:bg-gray-500"
          >
            Enter
          </button>
        </div>
      </div>
    );

};