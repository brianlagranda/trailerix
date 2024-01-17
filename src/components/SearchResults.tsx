import React from 'react';
import noImagePlaceholder from '../assets/noImagePlaceholder.png';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
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
            {results.map((result, index) => (
                <li key={index} className="mb-4 mt-2 flex p-2 gap-3">
                    {result.poster_path === null ? (
                        <img
                            className="w-1/3 md:w-1/5 rounded-md object-contain"
                            src={noImagePlaceholder}
                        ></img>
                    ) : (
                        <img
                            className="w-1/3 md:w-1/5 rounded-md object-contain"
                            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        ></img>
                    )}
                    {result.title}
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
