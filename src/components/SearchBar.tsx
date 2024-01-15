import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import { useTmdbApi } from '../services/tmdbApi.ts';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const tmdbApi = useTmdbApi();

  useEffect(() => {
    const search = async () => {
      try {
        const results = await tmdbApi.searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error(error);
      }
    };
    search();
  }, [query, tmdbApi]);

  return (
    <div className='flex flex-col items-center mt-8'>
      <div className='gap-2 w-full md:w-3/4 md:grid-cols-[10fr,1fr] lg:w-2/4'>
        <input
          className='w-full h-10 rounded-md p-3 bg-zinc-800 focus:outline-none focus:ring-0'
          type='text'
          placeholder='Search your favourite movies/series...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchResults results={movies} />
      </div>
    </div>
  );
};

export default SearchBar;
