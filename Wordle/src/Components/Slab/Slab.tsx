import React from "react";
interface slabProps {
    character: string
}
export const Slab: React.FC<slabProps> = ({ character }) => {
    return (
        <div className="w-14 h-14 border-2 border-gray-700 flex items-center justify-center text-xl uppercase">
            {character}
        </div>
    )
}