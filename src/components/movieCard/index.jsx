import React, { useContext  } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({ movie, action, isUpcoming }) {
  const { favourites, mustWatch } = useContext(MoviesContext);
 
  if(movie.name){
    movie.favourite = favourites.tvShows.find((id) => id === movie.id)
  } else {
    movie.favourite = favourites.movies.find((id) => id === movie.id)
  }
  
  movie.mustWatch = mustWatch.find((id) => id === movie.id)

  const displayFavourite = !isUpcoming && movie.favourite;
  const displayMustWatch = isUpcoming && movie.mustWatch;
  const displayAvatar = displayFavourite || displayMustWatch;

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        avatar={
          displayAvatar ? (
            <Avatar sx={styles.avatar}>
              {displayFavourite ? <FavoriteIcon /> : <PlaylistAddCheckIcon /> }
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title ? movie.title : movie.name}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
