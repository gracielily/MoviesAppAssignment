import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';

const AddToMustWatchList = ({ movie }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      <VisibilityIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchList;
