import React from 'react';
import SearchResults from './SearchResults';
import useSearch from '../hooks/useSearch';
import { Triangle } from 'react-loader-spinner';

const SearchBar: React.FC = () => {
    const { searchTerm, setSearchTerm, data, loading, error } = useSearch();

    return (
        <div className="flex flex-col items-center mt-8">
            <div className="gap-2 w-full md:w-3/4 md:grid-cols-[10fr,1fr] lg:w-2/4">
                <input
                    className="w-full h-10 rounded-md p-3 bg-zinc-800 focus:outline-none focus:ring-0"
                    type="text"
                    placeholder="Search your favourite movies/series..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm !== '' && <SearchResults results={data} />}
            </div>
            {loading && (
                <Triangle
                    visible={true}
                    height="50"
                    width="50"
                    color="#fff"
                    ariaLabel="triangle-loading"
                    wrapperClass="p-4"
                />
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SearchBar;
