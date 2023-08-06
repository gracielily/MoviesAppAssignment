import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AddToMustWatchList = ({ movie }) => {
  const context = useContext(MoviesContext);
  const { token } = useContext(AuthContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };
  return (
    <>
      {token ? (
        <IconButton aria-label="add to must watch" onClick={onUserSelect}>
          <VisibilityIcon color="secondary" fontSize="large" />
        </IconButton>
      ) : null}
    </>
  );
};

export default AddToMustWatchList;
