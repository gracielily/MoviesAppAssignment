import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Grid from "@mui/material/Grid";
import RemoveFromPlaylistsIcon from "../cardIcons/removeFromPlaylists";
import { Chip, Button } from "@mui/material";
import { Link } from "react-router-dom";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function PlaylistCard({ playlist }) {

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        title={
          <Typography variant="h5" component="p">
            {playlist.title}{" "}
          </Typography>
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <Chip label={playlist.theme} color="secondary" />
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
            <MovieFilterIcon fontSize="small" />
              {"  "} {playlist.movies.length}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <RemoveFromPlaylistsIcon playlist={playlist} />
        <Link to={`/playlists/${playlist.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            View Playlist
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
