import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid";

const ActorsList = ( { actors }) => {
  let actorCards = actors.map((a) => (
    <Grid key={a.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <ActorCard key={a.id} actor={a} />
    </Grid>
  ));
  return actorCards;
};

export default ActorsList;