import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorsList from "../actorsList";
import { Alert, AlertTitle } from "@mui/material";

const styles = {
  root: {
    padding: "20px",
  },
};

function TrendingActorsPageTemplate({ actors, title, action }) {
  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        {actors?.length ? (
          <Grid item container spacing={5}>
            <ActorsList actors={actors} action={action} displayMoreInfo={true} />
          </Grid>
        ) : (
          <Alert severity="info">No Actors could be found.</Alert>
        )}
      </Grid>
    </>
  );
}
export default TrendingActorsPageTemplate;
