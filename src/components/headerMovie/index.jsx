import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid } from "@mui/material";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
    marginRight: "5px",
    marginLeft: "5px"
  },
};

const MovieHeader = (props) => {
  const movie = props.movie;
  const context = useContext(MoviesContext);
  const isinFavourites = context?.favourites[
    movie.name ? "tvshows" : "movies"
  ].includes(movie.id);
  const isInPlaylists = context?.playlists.find((playlist) => {
    return playlist.movies.includes(movie.id)
  });
  const isInMustWatch = context?.mustWatch.includes(movie.id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  let headerTitle = "";

  if (props.isReview) {
    headerTitle = "Review";
  } else {
    headerTitle = movie.title ? "Movie Details" : "Tv Show Details";
  }

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" onClick={goBack} />
      </IconButton>
      
      <Typography variant="h4" component="h3">
        {headerTitle}
        {"   "}
        <a href="/">
          <HomeIcon color="primary" fontSize="='large" />
        </a>
      </Typography>
      <IconButton aria-label="go back">
        <ArrowForwardIcon
          color="primary"
          fontSize="large"
          onClick={goForward}
        />
      </IconButton>
      <Grid container xs={12} justifyContent={"center"}>{isinFavourites ? (
        <Avatar sx={styles.avatar}>
          <FavoriteIcon />
        </Avatar>
      ) : null}
      {isInMustWatch ? (
        <Avatar sx={styles.avatar}>
          <VisibilityIcon />
        </Avatar>
      ) : null}
      {isInPlaylists ? (
        <Avatar sx={styles.avatar}>
          <PlaylistAddCheckIcon />
        </Avatar>
      ) : null}</Grid>
    </Paper>
  );
};

export default MovieHeader;
