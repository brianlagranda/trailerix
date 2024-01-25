import React from 'react';

interface RatingCircleProps {
    rating: number;
}

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
            className={`w-12 h-12 border-4 rounded-full flex items-center justify-center bg-black/60 ${getColorClass()}`}
        >
            <span className="text-md font-bold text-white">
                {formattedRating}
            </span>
        </div>
    );
};

export default RatingCircle;
