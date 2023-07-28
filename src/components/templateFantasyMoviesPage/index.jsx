import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Header from "../headerMovieList";
import FantasyMovieList from "../fantasyMovieList";
import { Link } from "react-router-dom";
const FantasyMoviesPageTemplate = ({ movies, action }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header title={"Fantasy Movies"} />
          <Link to="/fantasy-movies/form"><Button>Create New</Button></Link>
        </Grid>

        <Grid item container spacing={5}>
        <FantasyMovieList movies={movies} action={action}/>
        </Grid>     
      </Grid>
    
    </>
  );
}
export default FantasyMoviesPageTemplate;
