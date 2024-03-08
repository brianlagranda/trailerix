import React, { useState } from 'react';
import noImagePlaceholder from '../assets/noImagePlaceholder.png';
import { truncateText } from '../utils/functions.tsx';
import RatingCircle from './RatingCircle.tsx';
import { SearchResultsProps } from '../types/SearchTypes';
import VideoPlayer from './VideoPlayer.tsx';

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (results.length === 0) {
        return null;
    }

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
                } -mt-3 rounded-b-md p-3`}
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
                            className="mt-4 grid w-full grid-cols-4 gap-4 p-2"
                        >
                            <div
                                className="relative col-span-1 h-full w-full cursor-pointer"
                                onClick={() =>
                                    trailer && openVideo(trailer.key)
                                }
                            >
                                <img
                                    className="h-full w-full rounded-md object-contain"
                                    src={
                                        poster_path !== null
                                            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                                            : noImagePlaceholder
                                    }
                                    alt={`${media_type === 'movie' ? title : name} movie poster`}
                                />
                                <div className="absolute left-full -translate-x-3/4 -translate-y-3/4 transform">
                                    <RatingCircle rating={vote_average} />
                                </div>
                            </div>
                            <div className="col-span-3 rounded-md border border-gray-200/20 bg-gray-200/10 p-2">
                                <h2 className="text-center text-lg font-bold">
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
                                            className="rounded-lg border-2 border-indigo-600 bg-indigo-400/20 p-1 text-sm font-bold text-white"
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
