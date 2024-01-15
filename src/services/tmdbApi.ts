interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface ApiResponse {
  results: Movie[];
}

export const useTmdbApi = () => {
  const apiKey = process.env.TMDB_API_KEY;
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  const baseUrl = 'https://api.themoviedb.org/3';

  const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(
        `${baseUrl}/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
        options
      );

      console.log(apiKey);
      console.log(accessToken);

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
