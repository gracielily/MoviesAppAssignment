import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies, searchForMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const HomePage = (props) => {
  const [queryParams, setQueryParams] = useState({});
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([])

  const { data:movies_data, error:movies_error, isLoading:loading_movies, isError:movies_has_error, refetch:refetch_movies } = useQuery(
    "discover",
    () => getMovies(page, queryParams),
    { keepPreviousData: true }
  );

  const { data:search_movies, error:search_error, isLoading:loading_search, isError:search_has_error, refetch:refetch_search } = useQuery(
    "search",
    () => searchForMovie(searchTerm),
    { keepPreviousData: true }
  );

  

  const updateMoviesQuery = (query) => {
    const queryToSend = {...queryParams}
    if(query.with_origin_country) queryToSend.with_origin_country = query.with_origin_country
    if(query.year) queryToSend.year = query.year
    if(query.language) queryToSend.language = query.language
    if(query.sort_by) queryToSend.sort_by = query.sort_by
    if(query.with_genres) {
      // if all genres selected
      if(query.with_genres === "0" && queryToSend.with_genres) {
        delete queryToSend.with_genres
      } else {
      queryToSend.with_genres = query.with_genres
      }
    }
    setQueryParams(queryToSend)
  }
  
  const setResultsPage = (newPageNum) => {
    setPage(newPageNum);
  }
  
  useEffect(() => {
    refetch_movies();
  }, [queryParams, page]);


  useEffect(() => {
    if(searchTerm){
    refetch_search(searchTerm);
    }
  }, [searchTerm]);


  useEffect(() => {
    if(searchTerm && search_movies){
      setMovies(search_movies)
    } else if (movies_data){
      setMovies(movies_data)
    }
  }, [movies_data, search_movies]);

  if (loading_movies || loading_search) {
    return <Spinner />;
  }
  if (movies_has_error || search_has_error) {
    return <h1>{search_error ? search_error.message : movies_error.message}</h1>;
  }
  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies?.results}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />;
      }}
      isUpcoming={false}
      updateQuery={updateMoviesQuery}
      setResultsPage={setResultsPage}
      updateSearchTerm={setSearchTerm}
      totalResults={movies?.total_results}
      totalPages={movies?.total_pages}
    />
  );
};
export default HomePage;
