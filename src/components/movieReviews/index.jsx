import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { MoviesContext } from "../../contexts/moviesContext";
import WriteReviewIcon from "../cardIcons/writeReview";
import StarRateIcon from "@mui/icons-material/StarRate";

const styles = {
  table: {
    minWidth: 550,
  },
};

export default function MovieReviews({ type, movie }) {
  const [reviews, setReviews] = useState([]);
  const { myReviews } = React.useContext(MoviesContext);

  useEffect(() => {
    getMovieReviews(type, movie.id).then((reviews) => {
      setReviews(reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      {movie.id in myReviews ? (
        <Table sx={styles.table} aria-label="user reviews table">
          <TableHead>
            <TableRow>
              <TableCell>My Review</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Typography variant="h6" component="p">
                  <StarRateIcon fontSize="small" />
                  {"  "} {myReviews[movie.id].rating}{" "}
                </Typography>
              </TableCell>
              <TableCell>{myReviews[movie.id].review}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <>
          <WriteReviewIcon movie={movie} type={type} />
          <span>Write A Review</span>
        </>
      )}
      <Table sx={styles.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
