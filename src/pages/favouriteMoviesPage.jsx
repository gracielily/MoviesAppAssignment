import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import MoveMovie from "../components/cardIcons/moveMovie";

const FavouriteMoviesPage = (props) => {
  const { favourites } = useContext(MoviesContext);

  const favouriteMovieQueries = useQueries(
    favourites.movies?.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favouriteMovieQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavourites el={movie} type="movies" />
            <WriteReview movie={movie} type="movie" />
            {movies.length > 1 && (
              <>
              {movies.indexOf(movie) !== 0 && (<><MoveMovie type="movies" el={movie} direction="up"/></>)}
              {movies.indexOf(movie) + 1 !== movies.length && (<><MoveMovie type="movies" el={movie} direction="down" /></>)}
                
              </>
            )}
          </>
        );
      }}
      isUpcoming={false}
      hidePagination={true}
      type="movies"
    />
  );
};

export default FavouriteMoviesPage;
