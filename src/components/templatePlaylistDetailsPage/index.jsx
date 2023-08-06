import React from "react";
import { Typography, Grid, Paper, Chip } from "@mui/material";
import PlaylistMovies from "../playlistMovies";
import Header from "../headerMovieList";

const TemplatePlaylistDetailsPage = ({
  playlist,
  movies,
  removeFromPlaylist,
}) => {
  return (
    <>
      <Header title="Playlist Details" />
      <Grid container direction="column" sx={{ padding: "20px" }}>
        <Typography variant="h3" align="center" gutterBottom>
          {playlist.title}
        </Typography>
        <Chip label="Theme" sx={{ margin: "0 auto" }} color="secondary" />
        <Typography variant="p" component="p" textAlign="center" sx={{ mt: 2 }}>
          {playlist.description}
        </Typography>

        <Paper sx={{mt: 2}}>
          <Typography variant="h5" textAlign="center" sx={{ mb: 2, mt: 2 }}>
            Playlist Movies
          </Typography>
          <PlaylistMovies
            playlist={playlist}
            movies={movies}
            removeFromPlaylist={removeFromPlaylist}
          />
        </Paper>
      </Grid>
    </>
  );
};

export default TemplatePlaylistDetailsPage;
