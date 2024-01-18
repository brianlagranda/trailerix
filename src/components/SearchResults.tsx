import React from 'react';
import noImagePlaceholder from '../assets/noImagePlaceholder.png';
import { truncateText } from '../utils/functions.tsx';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
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
            {results.map(({ poster_path, title, overview }, index) => (
                <li key={index} className="mt-2 flex p-2 gap-3">
                    {poster_path === null ? (
                        <img
                            className="w-1/3 md:w-1/5 rounded-md object-contain"
                            src={noImagePlaceholder}
                        ></img>
                    ) : (
                        <img
                            className="w-1/3 md:w-1/5 rounded-md object-contain"
                            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        ></img>
                    )}
                    <div className="w-full p-2 border border-gray-200/20 rounded-md bg-gray-200/10">
                        <h2 className="text-center">{title}</h2>
                        <p className="p-4">{truncateText(overview)}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
