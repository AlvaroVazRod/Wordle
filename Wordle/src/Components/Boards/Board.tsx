import React from "react";
import { Slab } from "../Slab/Slab"
import { SlabStatus } from '../../Types/types';
interface Props {
    character: string[][];
    animatedCell?: { row: number; col: number };
    statusMatrix?: SlabStatus[][];
}



export const Board: React.FC<Props> = ({ character, animatedCell, statusMatrix }) => {
    return (
        <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${character.length}, 1fr)` }}>
            {character.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2">
                    {row.map((letter, colIndex) => {
                        const isAnimated = animatedCell?.row === rowIndex && animatedCell?.col === colIndex;
                        const cellStatus = statusMatrix?.[rowIndex]?.[colIndex] ?? '';
                        return (
                            <Slab
                                key={colIndex}
                                character={letter}
                                animate={isAnimated}
                                status={cellStatus}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};