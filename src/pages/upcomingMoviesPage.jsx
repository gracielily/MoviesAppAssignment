import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchList from '../components/cardIcons/addToMustWatchList';
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading, isError } = useQuery(["upcoming", page], () => getUpcomingMovies(page), { keepPreviousData : true });
  
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
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchList movie={movie} />
      }}
      isUpcoming={true}
      currentPage={page}
      setResultsPage={setResultsPage}
      totalResults={totalResults}
      type="movies"
      displayFeature={true}
    />
  );
};
export default UpcomingMoviesPage;
