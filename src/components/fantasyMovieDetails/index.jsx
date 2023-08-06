import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import img from "../../images/film-poster-placeholder.png";
import Header from "../headerMovieList";
import ApartmentIcon from '@mui/icons-material/Apartment';
import FantasyMovieCastTable from "../fantasyMovieCastTable";

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
    <Header title="Fantasy Movie Details" />
    <Grid sx={{padding: "20px"}}>
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

      <Paper variant="outlined" sx={{textAlign: "center", marginTop: "20px"}}>
        <img
          src={
            movie.posterImg
            ? `${import.meta.env.VITE_SUPABASE_POSTER_BASE_URL}${movie.posterImg}`
            : img
          }
          style={{maxWidth: "500px", maxHeight: "600px"}}
        />

      <Paper component="ul" sx={styles.chipSet}>
        {movie.genres.length ? (<>        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="secondary" />
        </li>
        {movie.genres.map((g, index) => (
          <li key={index}>
            <Chip label={g} />
          </li>
        ))}</>) : null}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        {movie.runtime ? (<Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />) : null}
        {movie.releaseDate ? (<Chip icon={<InsertInvitationIcon/>} label={`${movie.releaseDate}`} />) : null}
        {movie.productionCompany ? (<Chip icon={<ApartmentIcon/>} label={`${movie.productionCompany}`} />) : null}
      </Paper>
      <Paper>
        </Paper>
        {movie.cast[0].actor ? (<FantasyMovieCastTable actors={movie.cast}/>) : null}
      </Paper>
      </Grid>
    </>
  );
};
export default FantasyMovieDetails;
