import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

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
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
    ) : null}
    </>
  );
};

export default WriteReviewIcon;
