import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import SimilarMedia from "../similarMedia";
import ActorsList from "../actorsList";
import { Grid } from "@mui/material";
import VideosList from "../VideosList";

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

const TvShowDetails = ( {tvShow}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>

      <Typography variant="h6" component="p">
        {tvShow.tagline}
      </Typography>

      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tvShow.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tvShow.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name}  />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip
          icon={<StarRate />}
          label={`${tvShow.vote_average} (${tvShow.vote_count})`}
        />
        <Chip label={`Number of Seasons: ${tvShow.number_of_seasons}`} />
        <Chip label={`Number of Episodes: ${tvShow.number_of_episodes}`} />
        <Chip label={`First Air Date: ${tvShow.first_air_date}`} />
        <Chip label={`Last Aired Date: ${tvShow.last_air_date}`} />
      </Paper>
      <Paper>
        <a href={tvShow.homepage}>Watch</a>
      </Paper>
      <Paper>
        <Typography variant="h5" gutterBottom>
          Cast Snapshot
        </Typography>
        <Grid item container spacing={2}>
          <ActorsList actors={tvShow.credits.cast.slice(0, 6)} />
        </Grid>
      </Paper>
      <Paper>
      <Typography variant="h5" gutterBottom>
          Videos
        </Typography>
        <VideosList elId={tvShow.id} type="tv" />
      </Paper>
      <Paper>
        <SimilarMedia type="tv" elId={tvShow.id} />
      </Paper>
      <Fab    
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={styles.fab}
      >
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews type="tv" movie={tvShow} />
      </Drawer>
    </>
  );
};
export default  TvShowDetails ;
