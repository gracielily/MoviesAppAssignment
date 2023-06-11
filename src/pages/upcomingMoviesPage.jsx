import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchList from '../components/cardIcons/addToMustWatchList';
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("upcoming", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchList movie={movie} />
      }}
      isUpcoming={true}
    />
  );
};
export default UpcomingMoviesPage;
