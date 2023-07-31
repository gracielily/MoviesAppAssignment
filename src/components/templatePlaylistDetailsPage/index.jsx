import React from "react";
import { Typography } from "@mui/material";
import PlaylistMovies from "../playlistMovies";

const TemplatePlaylistDetailsPage = ({ playlist, movies, removeFromPlaylist }) => {
  return (
    <>
     
        <Typography variant="h2" component="p">{playlist.title}</Typography>
        <Typography variant="p" component="p">{playlist.theme}</Typography>
        <Typography variant="p" component="p">{playlist.description}</Typography>
        <PlaylistMovies playlist={playlist} movies={movies} removeFromPlaylist={removeFromPlaylist} />

    </>
  );
};

export default TemplatePlaylistDetailsPage;
