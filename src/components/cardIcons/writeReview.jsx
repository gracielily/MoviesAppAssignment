import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Tooltip } from "@mui/material";
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
      
      <Tooltip title="Write a Review"><RateReviewIcon color="primary" fontSize="large"/></Tooltip>
    </Link>
    ) : null}
    </>
  );
};

export default WriteReviewIcon;
