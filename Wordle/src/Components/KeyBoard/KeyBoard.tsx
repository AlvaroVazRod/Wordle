import { Board } from "../Boards/Board";
import React from "react";
interface boardProps {
    onButtonPress: (letter: string) => void;
};

export const KeyBoard: React.FC<boardProps> = ({onButtonPress}) => {
    const rows = ['qwertyuiop','asdfghjklñ','zxcvbnm'];
    return(
        <div className="grid gap-2">
            {rows.map((row, rowIndex)=>(
                <div key={rowIndex} className="lex gap-2 justify-center">
                    {row.split('').map((character)=>(
                        <button 
                        key={character}
                        onClick={()=> onButtonPress(character)}
                        className="bg-gray-600 px-3 py-2 rounded text-white font-semibold hover:bg-gray-500">
                            {character}
                        </button>
                    ))}
                </div>
            ))}
        </div>


    )

};