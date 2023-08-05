import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import setQueryString from "../util";

const HomePage = () => {
  const [queryParams, setQueryParams] = useState({});
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const {
    data: movies_data,
    error: movies_error,
    isLoading: loading_movies,
    isError: movies_has_error,
    refetch: refetch_movies,
  } = useQuery("discover", () => getMovies(page, queryParams), {
    keepPreviousData: true,
  });

  const updateMoviesQuery = (query) => {
    const queryToSend = setQueryString(queryParams, query, "movie")
    setQueryParams(queryToSend);
  };

  const setResultsPage = (newPageNum) => {
    setPage(newPageNum);
  };

  useEffect(() => {
    refetch_movies();
  }, [queryParams, page]);

  useEffect(() => {
    setMovies(movies_data);
  }, [movies_data]);

  if (loading_movies) {
    return <Spinner />;
  }
  if (movies_has_error) {
    return <h1>{movies_error.message}</h1>;
  }
  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies?.results}
      action={(movie) => {
        return (
          <>
            <AddToFavouritesIcon el={movie} type="movies" />
            <AddToPlaylistIcon movie={movie} />
          </>
        );
      }}
      isUpcoming={false}
      updateQuery={updateMoviesQuery}
      setResultsPage={setResultsPage}
      totalResults={movies?.total_results}
      totalPages={movies?.total_pages}
      type="movies"
      displayFilter={true}
    />
  );
};
export default HomePage;
