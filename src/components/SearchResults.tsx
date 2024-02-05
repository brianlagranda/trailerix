import React, { useState } from 'react';
import noImagePlaceholder from '../assets/noImagePlaceholder.png';
import { truncateText } from '../utils/functions.tsx';
import RatingCircle from './RatingCircle.tsx';
import { SearchResultsProps } from '../types/SearchTypes';
import VideoPlayer from './VideoPlayer.tsx';

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const openVideo = async (videoId: string) => {
        try {
            if (!videoId) {
                throw new Error('Video ID is not available');
            }

            setSelectedVideo(videoId);
            setError(null);
        } catch (e) {
            if (e instanceof Error) {
                console.error('Error opening video:', e.message);
                setError('Failed to open video');
            }
        }
    };

    const closeVideo = () => {
        setSelectedVideo(null);
    };

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
        <>
            <ol
                className={`${
                    results[0].title === '' ? '' : 'bg-zinc-800'
                } -mt-3 p-3 rounded-b-md`}
            >
                {sortedResults.map(
                    ({
                        id,
                        poster_path,
                        title,
                        genres,
                        genre_ids,
                        overview,
                        vote_average,
                        media_type,
                        name,
                        trailer,
                    }) => (
                        <li
                            key={id}
                            className="mt-4 grid grid-cols-4 p-2 gap-4 w-full"
                        >
                            <div
                                className="col-span-1 relative w-full h-full cursor-pointer"
                                onClick={() =>
                                    trailer && openVideo(trailer.key)
                                }
                            >
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
                                <ul className="flex gap-2 p-2">
                                    {genres?.map((genre, index) => (
                                        <li
                                            key={
                                                genre_ids[index].toString() +
                                                id.toString()
                                            }
                                            className="border-2 border-indigo-600 rounded-lg p-1 bg-indigo-400/20 text-white text-sm font-bold"
                                        >
                                            {genre}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    )
                )}
            </ol>

            {selectedVideo && (
                <VideoPlayer
                    selectedVideo={selectedVideo}
                    closeVideo={closeVideo}
                />
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
};

export default SearchResults;
