import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import NavigationIcon from "@mui/icons-material/Navigation";
import MovieReviews from "../movieReviews";
import SimilarMedia from "../similarMedia";
import VideosList from "../VideosList";
import { Grid } from "@mui/material";
import ActorsList from "../actorsList";
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

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
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const FantasyMovieDetails = ({ movie }) => {
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        {movie.title} (
        {movie.releaseDate.split("-")[0]})
      </Typography>

      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<InsertInvitationIcon/>} label={`${movie.releaseDate}`} />
      </Paper>
      <Paper>
        <Typography variant="h5" gutterBottom>
          Cast Snapshot
        </Typography>
        <Grid item container spacing={2}>
          <ActorsList actors={movie.cast} />
        </Grid>
      </Paper>
    </>
  );
};
export default FantasyMovieDetails;
