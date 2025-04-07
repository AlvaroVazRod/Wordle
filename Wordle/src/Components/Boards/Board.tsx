import React from "react";
import {Slab} from "../Slab/Slab"
interface Props{
    character: string[][]
}



export const Board : React.FC<Props> = ({character}) => {
    return (
    <div className="grip gap-2">
        {character.map((row,rowIndex)=>(
            <div key={rowIndex} className="flex gap-2">
                {row.map((letter, colIndex)=>(
                    <Slab key={colIndex} character={letter}/>
                ))}
            </div>
        ))}
    </div>
    );
};