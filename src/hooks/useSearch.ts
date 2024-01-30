import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

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

interface useSearch {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    data: Data[];
    loading: boolean;
    error: string | null;
}

const useSearch = (): useSearch => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const searchMovies = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<{ results: Data[] }> =
                    await axios.get(
                        `https://trailerix-backend.vercel.app/data?query=${encodeURIComponent(searchTerm)}`
                    );
                setData(response.data.results || []);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching movies/series.');
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            if (searchTerm) {
                searchMovies();
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const delayedSetSearchTerm = useCallback(
        (term: string) => {
            setSearchTerm(term);
        },
        [setSearchTerm]
    );

    return {
        searchTerm,
        setSearchTerm: delayedSetSearchTerm,
        data,
        loading,
        error,
    };
};

export default useSearch;
