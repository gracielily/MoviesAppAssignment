import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesContext } from "../../contexts/moviesContext";
import { AuthContext } from "../../contexts/authContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

export default function ActorCard({ actor, action, displayMoreInfo }) {
  const { favourites } = useContext(MoviesContext);
  const {token} = useContext(AuthContext);
  actor.favourite = favourites.actors.find((id) => id === actor.id);
  

  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.header}
        title={
          <>
          <Link to={`/actor/${actor.id}`} style={{textDecoration: 'none'}}><Typography variant="h5" color="textPrimary" align="center"component="p">
              {actor.name}{" "}</Typography></Link>
            
            <Typography variant="h6" color="textSecondary" align="center" component="p">
              {actor.character}{" "}
            </Typography>
          </>
        }
        avatar={
          actor.favourite && (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          )
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
      <>
        {displayMoreInfo ? (
          <>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6" component="p">
                    <MovieFilterIcon fontSize="small" />
                    {actor.known_for_department}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" component="p">
                    <StarRateIcon fontSize="small" />
                    {"  "} {actor.popularity}{" "}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions disableSpacing>
              <>
                {action ? <>{action(actor)}</> : null}

                {token ? (<Link to={`/actor/${actor.id}`}>
                  <Button variant="outlined" size="medium" color="secondary">
                    View
                  </Button>
                </Link>) : null }
              </>
            </CardActions>
          </>
        ) : null}
      </>
    </Card>
  );
}
