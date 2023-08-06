import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavouritesIcon = ({ el, type }) => {
  const context = useContext(MoviesContext);
  const { token } = useContext(AuthContext);

  const onUserSelect = (e) => {
    e.preventDefault();
    context.addToFavourites(el, type);
  };
  return (
    <>
      {token ? (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
          <FavoriteIcon color="secondary" fontSize="large" />
        </IconButton>
      ) : null}
    </>
  );
};

export default AddToFavouritesIcon;
