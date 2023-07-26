

const _fetchData = (urlToFetch) => {
  return fetch(
    urlToFetch
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
}
export const getMovies = (page, queryParams) => {
  let queryParamStr = ""
  for (const [key, value] of Object.entries(queryParams)) {
    queryParamStr += `&${key}=${value}`
  }
  console.log(queryParamStr, page)

  return _fetchData(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}${queryParamStr}`
  )
};

  
export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return _fetchData(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
};

  
  export const getMovieGenres = async () => {
    return _fetchData(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    )
  };
  
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return _fetchData(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
  };
  

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        return json.results;
      });
  };

  export const getUpcomingMovies = () => {
    return _fetchData(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
  };

  
  export const getTopRatedMovies = () => {
    return _fetchData(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    )
  };


  export const getTvShows = (pageNum) => {
    return _fetchData(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageNum}&sort_by=popularity.desc`
    )
  };


  export const getTrendingActors = () => {
    return _fetchData(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
    )
  };

  export const getActor = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return _fetchData(
      `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
  };


  export const searchForMovie = (searchTerm) => {
    return _fetchData(
      `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${searchTerm}`
    )

  }

  
  