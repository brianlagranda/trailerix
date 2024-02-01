export interface SearchResult {
    id: number;
    title: string;
    genres: string[];
    genre_ids: number[];
    poster_path: string;
    overview: string;
    vote_average: number;
    media_type: string;
    name: string;
    video_key: string;
}

export interface SearchResultsProps {
    results: SearchResult[];
}

export interface SearchHook {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    data: SearchResult[];
    loading: boolean;
    error: string | null;
}

export interface RatingCircleProps {
    rating: number;
}
