import React from "react";
import FantasyMovieForm from "../components/fantasyMovieForm";
import { useQuery } from "react-query";
import { getMovieGenres } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const CreateFantasyMoviePage = (props) => {
  const { data: genreChoices, error, isLoading, isError } = useQuery(
    "genres",
    getMovieGenres
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <FantasyMovieForm genreChoices={genreChoices.genres} />
  );
};

export default CreateFantasyMoviePage;
