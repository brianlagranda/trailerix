interface Movie {
  id: number;
  title: string;
}

interface ApiResponse {
  results: Movie[];
}

export const useTmdbApi = () => {
  const apiKey = '578a9821544e4e5911d8e6575cec921e';
  const baseUrl = 'https://api.themoviedb.org/3';

  const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        `${baseUrl}/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
        options
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: ApiResponse = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching TMDB API:', error);
      throw error;
    }
  };

  return {
    searchMovies,
  };
};
