import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const TopMoviesListPage = () => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading, isError } = useQuery(
    ["top", page],
    () => getTopRatedMovies(page),
    { keepPreviousData: true }
  );

  const setResultsPage = (newPageNum) => {
    setPage(newPageNum);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ? data.results : [];
  const totalResults = data ? data.total_results : null;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavouritesIcon el={movie} type="movies" />
            <AddToPlaylistIcon movie={movie} />
          </>
        );
      }}
      isUpcoming={false}
      currentPage={page}
      setResultsPage={setResultsPage}
      totalResults={totalResults}
      type="movies"
      displayFeature={true}
    />
  );
};
export default TopMoviesListPage;
