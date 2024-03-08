import React from 'react';
import { RatingCircleProps } from '../types/SearchTypes';

const RatingCircle: React.FC<RatingCircleProps> = ({ rating }) => {
    const formattedRating = rating.toFixed(1);

    const getColorClass = () => {
        if (rating >= 8) {
            return 'border-green-500';
        } else if (rating >= 6) {
            return 'border-yellow-500';
        } else {
            return 'border-red-500';
        }
    };

    return (
        <div
            className={`flex h-12 w-12 items-center justify-center rounded-full border-4 bg-black/60 ${getColorClass()}`}
        >
            <span className="text-md font-bold text-white">
                {formattedRating}
            </span>
        </div>
    );
};

export default RatingCircle;
