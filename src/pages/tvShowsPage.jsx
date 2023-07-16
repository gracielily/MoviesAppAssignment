import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "react-query";
import AddToMustWatchList from '../components/cardIcons/addToMustWatchList';
import Spinner from "../components/spinner";
import { getTvShows } from "../api/tmdb-api";

const TvShowsPage = () => {
  const { data, error, isLoading, isError } = useQuery("top", getTvShows);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvShows = data ? data.results : [];
  return (
    <PageTemplate
      title="TV Shows"
      movies={tvShows}
      action={(movie) => {
        return <AddToMustWatchList movie={movie} />
      }}
      isUpcoming={false}
    />
  );
};
export default TvShowsPage;
