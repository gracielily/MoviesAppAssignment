import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorsList from "../actorsList";
const styles = {
  root: {
    padding: "20px",
  }
};

function TrendingActorsPageTemplate({ actors, title, action }) {

  return (
   <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <ActorsList actors={actors} action={action}  />
        </Grid>
      </Grid>
    </>  
  );
}
export default TrendingActorsPageTemplate;
