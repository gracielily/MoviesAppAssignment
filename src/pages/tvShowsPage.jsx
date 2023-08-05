import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Spinner from "../components/spinner";
import { getTvShows } from "../api/tmdb-api";
import setQueryString from "../util";

const TvShowsPage = () => {
  const [page, setPage] = useState(1);
  const [queryParams, setQueryParams] = useState({});

  const { data, error, isLoading, isError, refetch } = useQuery(
    ["tvShows", page],
    () => getTvShows(page, queryParams),
    { keepPreviousData: true }
  );

  const updateTvShowsQuery = (query) => {
    const queryToSend = setQueryString(queryParams, query, "tv")
    setQueryParams(queryToSend);
  }

  const setResultsPage = async (newPageNum) => {
    setPage(newPageNum);
  };

  useEffect(() => {
    refetch();
  }, [queryParams, page]);

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
        return <AddToFavouritesIcon el={movie} type="tvshows" />;
      }}
      isUpcoming={false}
      setResultsPage={setResultsPage}
      totalResults={totalResults}
      currentPage={page}
      type="tvshows"
      displayFilter={true}
      updateQuery={updateTvShowsQuery}
      displayFeature={true}
    />
  );
};
export default TvShowsPage;
