import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
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
    top: 70,
    right: 2,
  },
};

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        {movie.title ? movie.title : movie.name} (
        {movie.release_date.split("-")[0]})
      </Typography>

      <Typography variant="h5" align="center" gutterBottom>
        {movie.tagline}
      </Typography>

      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Overview
      </Typography>
      <Typography variant="h6" component="p" sx={{mb: 1}}>
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="secondary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
       <Chip icon={<InsertInvitationIcon/>} label={`${movie.release_date}`} />
      </Paper>
      <Typography variant="h5" gutterBottom textAlign="center" sx={{mt: 2, mb: 2}}>
          Cast Snapshot
        </Typography>

        <Grid item container spacing={2}>
          <ActorsList actors={movie.credits.cast.slice(0, 6)} />
        </Grid>
        
      <Paper sx={{mt: 4}}>
        <VideosList elId={movie.id} type="movie" />
      </Paper>
      <Typography variant="h5" gutterBottom sx={{mt: 3}} textAlign="center">
          Similar Movies
        </Typography>
      <Paper>
        <SimilarMedia type="movie" elId={movie.id} />
      </Paper>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews type="movie" movie={movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;
