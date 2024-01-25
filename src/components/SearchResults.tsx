import React from 'react';
import noImagePlaceholder from '../assets/noImagePlaceholder.png';
import { truncateText } from '../utils/functions.tsx';
import RatingCircle from './RatingCircle.tsx';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
}

interface SearchResultsProps {
    results: Movie[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (results.length === 0) {
        return null;
    }

    return (
        <ul
            className={`${
                results[0].title === '' ? '' : 'bg-zinc-800'
            } -mt-3 p-3 rounded-b-md`}
        >
            {results.map(
                ({ poster_path, title, overview, vote_average }, index) => (
                    <li
                        key={index}
                        className="mt-4 grid grid-cols-4 p-2 gap-4 w-full"
                    >
                        {poster_path === null ? (
                            <div className="col-span-1">
                                <img
                                    className="w-full md:w-1/2 rounded-md object-contain"
                                    src={noImagePlaceholder}
                                    alt={`${title} movie poster`}
                                />
                                <RatingCircle rating={vote_average} />
                            </div>
                        ) : (
                            <div className="col-span-1 relative w-full h-full">
                                <img
                                    className="w-full h-full rounded-md object-contain"
                                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                                    alt={`${title} movie poster`}
                                />
                                <div className="absolute left-full transform -translate-x-3/4 -translate-y-3/4">
                                    <RatingCircle rating={vote_average} />
                                </div>
                            </div>
                        )}
                        <div className="col-span-3 p-2 border border-gray-200/20 rounded-md bg-gray-200/10">
                            <h2 className="text-center font-bold text-lg">
                                {title}
                            </h2>
                            <p className="p-2">{truncateText(overview)}</p>
                        </div>
                    </li>
                )
            )}
        </ul>
    );
};

export default SearchResults;
