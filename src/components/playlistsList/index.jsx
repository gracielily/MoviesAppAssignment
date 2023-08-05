import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import PlaylistCard from "../playlistCard";
import { MoviesContext } from "../../contexts/moviesContext";
import { Alert } from "@mui/material";

const PlaylistList = () => {
  const {playlists} = useContext(MoviesContext)
  let playlistCards = playlists?.map((pl, index) => (
    <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <PlaylistCard key={index} playlist={pl} />
    </Grid>
  ));
  if (!playlistCards.length) {
    playlistCards = <Alert severity="info">No Playlists could be found.</Alert>
  }
  return playlistCards;
};

export default PlaylistList;