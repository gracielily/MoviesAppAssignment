import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromMustWatchIcon = ({ el, type }) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e) => {
    e.preventDefault();
    context.removeFromMustWatch(el, type);
  };

  return (
    <IconButton aria-label="remove from must watch" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchIcon;
