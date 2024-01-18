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
    searchMovies: () => Promise<void>;
}

const useMovieSearch = (): UseMovieSearch => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const searchMovies = useCallback(async () => {
        try {
            setLoading(true);
            const response: AxiosResponse<{ results: Movie[] }> =
                await axios.get(
                    `/data?query=${encodeURIComponent(searchTerm)}`
                );
            setMovies(response.data.results || []);
        } catch (error) {
            console.error(error);
            setError('An error occurred while fetching movies.');
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        searchMovies();
    }, [searchTerm, searchMovies]);

    return {
        searchTerm,
        setSearchTerm,
        movies,
        loading,
        error,
        searchMovies,
    };
};

export default useMovieSearch;
