import React, { useContext } from "react";
import PageTemplate from "../components/templateFantasyMoviesPage/index.jsx";
import { MoviesContext } from "../contexts/moviesContext.jsx";
import RemoveFromFantasyMovies from "../components/cardIcons/removeFromFantasyMovies.jsx";
const FantasyMoviesPage = (props) => {
  const { myFantasyMovies } = useContext(MoviesContext);

  return (
    <PageTemplate
      title="Fantasy Movies"
      movies={myFantasyMovies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFantasyMovies movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FantasyMoviesPage;
