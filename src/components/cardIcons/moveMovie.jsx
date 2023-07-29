import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const MoveMovie = ({ el, type, direction }) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.reorderFavorites(el, type, direction);
  };
  return (
    <IconButton aria-label="change order in favorites" onClick={onUserSelect}>
      {direction === "down" ? <ArrowCircleDownIcon color="primary" fontSize="large" /> : <ArrowCircleUpIcon color="primary" fontSize="large" />}
    </IconButton>
  );
};

export default MoveMovie;
