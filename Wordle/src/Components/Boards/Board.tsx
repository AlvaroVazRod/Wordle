import React from "react";
import { Slab } from "../Slab/Slab"
interface Props {
    character: string[][];
    animatedCell?: { row: number; col: number };
}



export const Board: React.FC<Props> = ({ character, animatedCell }) => {
    return (
        <div className="grip gap-2">
            {character.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((letter, colIndex) => {
                        const isAnimated = animatedCell?.row === rowIndex && animatedCell?.col === colIndex;
                        return (
                            <Slab key={colIndex} character={letter} animate={isAnimated} />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};