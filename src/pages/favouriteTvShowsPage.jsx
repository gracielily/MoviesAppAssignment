import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import MoveMovie from "../components/cardIcons/moveMovie";

const FavouriteTvShowsPage = (props) => {
  const { favourites } = useContext(MoviesContext);

  const favTvShowsQueries = useQueries(
    favourites.tvShows?.map((tvId) => {
      return {
        queryKey: ["tvShow", { id: tvId }],
        queryFn: getTvShow,
      };
    })
  );
  const isLoading = favTvShowsQueries.find((tv) => tv.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const tvShows = favTvShowsQueries.map((q) => q.data);

  return (
    <PageTemplate
      title="Favourite Tv Shows"
      movies={tvShows}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavourites el={movie} type="tvShows" />
            <WriteReview movie={movie} />
            {tvShows.length > 1 && (
              <>
              {tvShows.indexOf(movie) !== 0 && (<><MoveMovie direction="up" el={movie} type="tvShows" /></>)}
              {tvShows.indexOf(movie) !== tvShows.length && (<><MoveMovie direction="down" el={movie} type="tvShows" /></>)}
                
              </>
            )}
          </>
        );
      }}
      isUpcoming={false}
      hidePagination={true}
    />
  );
};

export default FavouriteTvShowsPage;
