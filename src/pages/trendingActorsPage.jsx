import React from "react";
import PageTemplate from '../components/templateActorsListPage';
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getTrendingActors } from "../api/tmdb-api";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const TrendingActorsPage = () => {
  const { data, error, isLoading, isError } = useQuery("top", getTrendingActors, { keepPreviousData : true });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const trendingActors = data ? data.results : [];
  return (
    <PageTemplate
      title="Trending Actors over last 24 hours"
      actors={trendingActors}
      action={(actor) => {
        return <AddToFavouritesIcon el={actor} type="actors" />
      }}
    />
  );
};
export default TrendingActorsPage;
