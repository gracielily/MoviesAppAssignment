import React from "react";
import Movie from "../movieCard";
import Grid from "@mui/material/Grid";

const MovieList = ( {movies, action, type }) => {
  let movieCards = movies?.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2} sx={{mt: 2, mb: 2}}>
      <Movie key={m.id} el={m} action={action} type={type}/>
    </Grid>
  ));
  return movieCards
};

export default MovieList;