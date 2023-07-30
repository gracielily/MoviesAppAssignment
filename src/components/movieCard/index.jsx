import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { Tooltip } from "@mui/material";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({ el, action, isUpcoming, type = "movie" }) {
  const { favourites, mustWatch, playlists } = useContext(MoviesContext);

  if (type === "tvshows") {
    el.favourite = favourites.tvshows.find((id) => id === el.id);
  } else {
    el.favourite = favourites.movies.find((id) => id === el.id);
  }

  el.mustWatch = mustWatch.find((id) => id === el.id);
  el.playlists = playlists.filter((pl) => pl.movies.includes(el.id));

  const displayFavourite = !isUpcoming && el.favourite;
  const displayMustWatch = isUpcoming && el.mustWatch;
  const displayPlaylist = !isUpcoming && el.playlists?.length;

  const displayAvatar = displayFavourite || displayMustWatch || displayPlaylist;
  let playlistsNames = "";
  if (el.playlists) {
    el.playlists.map((pl) => {
      playlistsNames += pl.title + " ";
    });
  }

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          displayAvatar ? (
            <Avatar sx={styles.avatar}>
              {displayFavourite ? <FavoriteIcon /> : null}
              {displayPlaylist ? (
                <>
                  <Tooltip title={`Added to playlist(s): ${playlistsNames}`}>
                    <PlaylistAddCheckIcon />
                  </Tooltip>{" "}
                </>
              ) : null}
              {displayMustWatch ? <VisibilityIcon /> : null}
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {el.title ? el.title : el.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          el.poster_path
            ? `https://image.tmdb.org/t/p/w500/${el.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {el.release_date ? el.release_date : el.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {el.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(el)}
        <Link to={`/${type}/${el.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
