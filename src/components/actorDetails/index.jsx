import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import img from "../../images/film-poster-placeholder.png";
import CakeIcon from "@mui/icons-material/Cake";
import TheatersIcon from "@mui/icons-material/Theaters";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "@mui/material";
import ActorCredits from "../actorCredits";
import Header from "../headerMovieList";
import { Grid } from "@mui/material";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
};

const ActorDetails = ({ actor, credits }) => {
  return (
    <>
      <Header title={actor.name} />

      <Paper variant="outlined" sx={{ textAlign: "center" }}>
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : img
          }
        />
        <Paper component="ul" sx={styles.chipSet}>
          <Chip icon={actor.gender === 1 ? <FemaleIcon /> : <MaleIcon />} />
          <Chip icon={<HomeIcon />} label={`${actor.place_of_birth}`} />
          <Chip icon={<CakeIcon />} label={`${actor.birthday}`} />
          {actor.deathday ? (
            <Chip icon={<EventBusyIcon />} label={`${actor.deathday}`} />
          ) : null}
          <Chip icon={<StarRate />} label={`Popularity: ${actor.popularity}`} />
          <Grid container justifyContent="center" sx={{mt: 3}}>
            {" "}
            <Link href={`https://www.imdb.com/name/${actor.imdb_id}`}>
              <Chip
                icon={<TheatersIcon />}
                label="IMDB Page"
                clickable
                color="secondary"
              />
            </Link>
          </Grid>
        </Paper>
        <Typography>{actor.biography}</Typography>
      </Paper>

      <ActorCredits credits={credits} />
    </>
  );
};
export default ActorDetails;
