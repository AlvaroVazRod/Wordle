import React from "react";
import { SlabStatus } from '../../Types/types';
interface boardProps {
  onButtonPress: (letter: string) => void;
  onBackSpace: () => void;
  onEnter: () => void;
  keyStatus?: Record<string, SlabStatus>;
};

export const KeyBoard: React.FC<boardProps> = ({ onButtonPress, onBackSpace, onEnter, keyStatus = {} }) => {
  const rows = ['qwertyuiop', 'asdfghjklñ'];
  const lastRows = "zxcvbnm";
  const getKeyColor = (letter: string) => {
    const status = keyStatus[letter];

    switch (status) {
      case 'correct':
        return 'bg-green-600 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };
  return (
    <div className="grid gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.split('').map((character) => (
            <button
              key={character}
              onClick={() => onButtonPress(character)}
              className={`bg-gray-600 px-3 py-2 rounded text-white font-semibold hover:bg-gray-500 ${getKeyColor(character)}`}
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
            className={`bg-gray-600 px-3 py-2 rounded text-white font-semibold hover:bg-gray-500 ${getKeyColor(character)}`}
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