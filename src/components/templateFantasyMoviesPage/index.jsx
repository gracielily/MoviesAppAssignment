import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Header from "../headerMovieList";
import FantasyMovieList from "../fantasyMovieList";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";

const FantasyMoviesPageTemplate = ({ movies, action }) => {
  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title="Fantasy Movies" />
      </Grid>

      <Grid xs={12}>
        <Link to="/fantasy-movies/form">
          <Button variant="outlined" sx={{ mb: 2, mt: 1 }}>
            Create Fantasy Movie
          </Button>
        </Link>

        {movies?.length ? (
          <Grid item container spacing={5}>
            <FantasyMovieList movies={movies} action={action} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert severity="warning">No Fantasy Movies could be found.</Alert>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
export default FantasyMoviesPageTemplate;
