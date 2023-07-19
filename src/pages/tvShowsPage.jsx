import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "react-query";
import AddToMustWatchList from '../components/cardIcons/addToMustWatchList';
import Spinner from "../components/spinner";
import { getTvShows } from "../api/tmdb-api";

const TvShowsPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["top", page], () => getTvShows(page), { keepPreviousData : true });

  const setResultsPage = async (newPageNum) => {
    setPage(newPageNum);
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const tvShows = data ? data.results : [];
  const totalResults = data ? data.total_results : null;

  return (
    <PageTemplate
      title="TV Shows"
      movies={tvShows}
      action={(movie) => {
        return <AddToMustWatchList movie={movie} />
      }}
      isUpcoming={false}
      setResultsPage={setResultsPage}
      totalResults={totalResults}
      currentPage={page}
    />
    
  );
};
export default TvShowsPage;
