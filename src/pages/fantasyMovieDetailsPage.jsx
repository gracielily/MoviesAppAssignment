import React from "react";
import { useParams } from "react-router-dom";
import FantasyMovieDetails from "../components/fantasyMovieDetails";
import PageTemplate from "../components/templateMoviePage";
import { MoviesContext } from "../contexts/moviesContext";

const FasntasyMovieDetailsPage = () => {
  const { id } = useParams();
  const {myFantasyMovies} = React.useContext(MoviesContext)
  const fantasyMovie = myFantasyMovies.find((fm) => fm.id == id)

  return (
    <>
      {fantasyMovie ? (
        <>

        <FantasyMovieDetails movie={fantasyMovie} />
        </>
      ) : (
        <p>Could not find fantasy movie</p>
      )}
    </>
  );
};

export default FasntasyMovieDetailsPage;
