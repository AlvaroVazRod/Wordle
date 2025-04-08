import React from "react";
interface slabProps {
    character: string
    animate?: boolean;
}
export const Slab: React.FC<slabProps> = ({ character, animate}) => {
    return (
        <div className={`w-14 h-14 border-2 border-gray-700 flex items-center justify-center text-xl uppercase 
            transition-all duration-200 ease-in-out 
            ${animate ? 'bg-yellow-400 scale-110 shadow-lg transition-transform duration-300 ease-out' : 'bg-gray-800'}`}>
            {character}
        </div>
    )
}