import React from 'react';

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
        <li key={index} className='mb-4 mt-2 flex p-2 gap-3'>
          <img
            className='w-1/5'
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
          ></img>
          {result.title}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
