import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Button } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';

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
      <RateReviewIcon color="primary" fontSize="large"/>
    </Link>
    ) : null}
    </>
  );
};

export default WriteReviewIcon;
