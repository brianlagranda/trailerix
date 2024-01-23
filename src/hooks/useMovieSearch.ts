import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

interface UseMovieSearch {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const useMovieSearch = (): UseMovieSearch => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const searchMovies = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<{ results: Movie[] }> =
                    await axios.get(
                        `https://trailerix-backend.vercel.app/data?query=${encodeURIComponent(searchTerm)}`
                    );
                setMovies(response.data.results || []);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching movies.');
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
        movies,
        loading,
        error,
    };
};

export default useMovieSearch;
