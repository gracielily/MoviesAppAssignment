import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromPlaylistsIcon = ({ playlist }) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromPlaylists(playlist.id);
  };

  return (
    <IconButton aria-label="remove from playlists" onClick={onUserRequest}>
      <DeleteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPlaylistsIcon;
