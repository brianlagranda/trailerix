import React from 'react';
import noImagePlaceholder from '../assets/noImagePlaceholder.png';
import { truncateText } from '../utils/functions.tsx';
import RatingCircle from './RatingCircle.tsx';

interface Data {
    id: number;
    title: string;
    genres: string[];
    poster_path: string;
    overview: string;
    vote_average: number;
    media_type: string;
    name: string;
}

interface SearchResultsProps {
    results: Data[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (results.length === 0) {
        return null;
    }

    const filteredResults = results.filter(
        (result) =>
            (result.media_type === 'movie' &&
                result.title &&
                result.title.trim() !== '' &&
                result.overview !== '' &&
                result.poster_path !== null) ||
            (result.media_type === 'tv' &&
                result.name &&
                result.name.trim() !== '' &&
                result.overview !== '' &&
                result.poster_path !== null)
    );

    const sortedResults = filteredResults.sort((a, b) => a.id - b.id);

    return (
        <ul
            className={`${
                results[0].title === '' ? '' : 'bg-zinc-800'
            } -mt-3 p-3 rounded-b-md`}
        >
            {sortedResults.map(
                (
                    {
                        poster_path,
                        title,
                        genres,
                        overview,
                        vote_average,
                        media_type,
                        name,
                    },
                    index
                ) => (
                    <li
                        key={index}
                        className="mt-4 grid grid-cols-4 p-2 gap-4 w-full"
                    >
                        <div className="col-span-1 relative w-full h-full">
                            <img
                                className="w-full h-full rounded-md object-contain"
                                src={
                                    poster_path !== null
                                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                        : noImagePlaceholder
                                }
                                alt={`${media_type === 'movie' ? title : name} movie poster`}
                            />
                            <div className="absolute left-full transform -translate-x-3/4 -translate-y-3/4">
                                <RatingCircle rating={vote_average} />
                            </div>
                        </div>
                        <div className="col-span-3 p-2 border border-gray-200/20 rounded-md bg-gray-200/10">
                            <h2 className="text-center font-bold text-lg">
                                {media_type === 'movie' ? title : name}
                            </h2>
                            <p className="p-2">{truncateText(overview)}</p>
                            <div className="flex gap-2 p-2">
                                {genres.map((genre) => (
                                    <div className="border-2 border-indigo-600 rounded-lg p-1 bg-indigo-400/20 text-white text-sm font-bold">
                                        {genre}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </li>
                )
            )}
        </ul>
    );
};

export default SearchResults;
