import React from "react";
import { Slab } from "../Slab/Slab"
import { SlabStatus } from '../../Types/types';
interface Props {
    character: string[][];
    animatedCell?: { row: number; col: number };
    statusMatrix?: SlabStatus[][];
}



export const Board: React.FC<Props> = ({ character, animatedCell, statusMatrix }) => {
    const numCols = character[0]?.length || 0;
    return (
        <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${character.length}, 1fr)` }}>
            {character.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 w-full">
                    {row.map((letter, colIndex) => {
                        const isAnimated = animatedCell?.row === rowIndex && animatedCell?.col === colIndex;
                        const cellStatus = statusMatrix?.[rowIndex]?.[colIndex] ?? '';
                        return (
                            <div key={`${rowIndex}-${colIndex}`}
                                style={{ flexBasis: `${100 / numCols}%` }}
                                className="aspect-square">
                                <Slab
                                    character={letter}
                                    animate={isAnimated}
                                    status={cellStatus}
                                />
                            </div>

                        );
                    })}
                </div>
            ))}
        </div>
    );
};