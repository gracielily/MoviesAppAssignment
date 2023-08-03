import React from "react";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovieOrTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const WriteReviewPage = () => {
  const location = useLocation()
  const { movieId, type } = location.state;
  const { data, error, isLoading, isError } = useQuery(
    ["movieOrTvShow", { id: movieId, type: type }],
    getMovieOrTvShow
  );
  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movie = data ? data : null

  return (
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
  );
};

export default WriteReviewPage;
