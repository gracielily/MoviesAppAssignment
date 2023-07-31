import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templatePlaylistDetailsPage";
import Spinner from "../components/spinner";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import { useQueries } from "react-query";

const PlaylistDetailsPage = () => {
  const { id } = useParams();
  const { playlists, removeMovieFromPlaylist } = useContext(MoviesContext);
  const playlist = playlists.find((pl) => pl.id == id);

  const playlistMovieQueries = useQueries(
    playlist.movies?.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);
  const movies = playlistMovieQueries.map((q) => q.data);
  
  const deleteMovie = (movieId) => {
    removeMovieFromPlaylist(playlist.id, movieId)
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <PageTemplate playlist={playlist} movies={movies} removeFromPlaylist={deleteMovie} />
    </>
  );
};

export default PlaylistDetailsPage;
