import React from "react";
import { SlabStatus } from '../../Types/types';
interface slabProps {
    character: string
    animate?: boolean;
    status?: SlabStatus;
}
export const Slab: React.FC<slabProps> = ({ character, animate, status = '' }) => {
    const statusColor = getStatusColor(status);
    return (
        <div className={`w-14 h-14 border-2 border-gray-700 flex items-center justify-center text-xl uppercase 
            transition-all duration-200 ease-in-out 
            ${statusColor}
            ${animate ? 'scale-110 shadow-lg transition-transform duration-300 ease-out' : ''}
            `}>
            {character}
        </div>
    )

}
const getStatusColor = (status: string) => {
    switch (status) {
        case 'correct':
            return 'bg-green-600 border-green-700';
        case 'present':
            return 'bg-yellow-500 border-yellow-600';
        case 'incorrect':
            return 'bg-gray-700 border-gray-800';
        default:
            return 'bg-gray-800 border-gray-700';
    }
};