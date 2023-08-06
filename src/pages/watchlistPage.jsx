import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatchList";
import MoveMovie from "../components/cardIcons/moveMovie";

const WatchlistMoviesPage = () => {
  const { mustWatch } = useContext(MoviesContext);

  const mustWatchMovieQueries = useQueries(
    mustWatch?.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchMovieQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromMustWatchIcon el={movie} />
            {movies.length > 1 && (
              <>
              {movies.indexOf(movie) !== 0 && (<><MoveMovie type="movies" el={movie} direction="up" isWatchList={true}/></>)}
              {movies.indexOf(movie) + 1 !== movies.length && (<><MoveMovie type="movies" el={movie} direction="down" isWatchList={true} /></>)}
                
              </>
            )}
          </>
        );
      }}
      hidePagination={true}
      type="movies"
    />
  );
};

export default WatchlistMoviesPage;
