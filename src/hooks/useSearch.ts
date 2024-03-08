import { useState, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { SearchHook, SearchResult } from '../types/SearchTypes';

const useSearch = (): SearchHook => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [data, setData] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const searchMovies = async () => {
            try {
                setLoading(true);
                const response: AxiosResponse<{ results: SearchResult[] }> =
                    await axios.get(
                        `http://localhost:7000/data?query=${encodeURIComponent(searchTerm)}`
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
