import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function MovieCard({ movie, action }) {
  const { token } = useContext(AuthContext);

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.posterImg
            ? `${import.meta.env.VITE_SUPABASE_POSTER_BASE_URL}${movie.posterImg}`
            : img
        }
      />
      <CardActions disableSpacing>
        {action(movie)}
        { token ? (<Link to={`/favorite-movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>) : null}
      </CardActions>
    </Card>
  );
}
