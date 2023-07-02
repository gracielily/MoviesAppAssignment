import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToMustWatchList from '../components/cardIcons/addToMustWatchList';
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const TopMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("top", getTopRatedMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];
  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchList movie={movie} />
      }}
      isUpcoming={false}
    />
  );
};
export default TopMoviesPage;
