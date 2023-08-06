import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Button } from "@mui/material";

const WriteReviewIcon = ({ movie, type }) => {
  const { token } = React.useContext(AuthContext);
  return (
    <>
      {token ? (
    <Link
      to={'/reviews/form'}
      state={{
          movieId: movie.id,
          type: type,
        }}
    >
      <Button variant="outlined" color="primary">Write a Review</Button>
    </Link>
    ) : null}
    </>
  );
};

export default WriteReviewIcon;
