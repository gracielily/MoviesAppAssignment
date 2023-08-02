import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getMovieGenres } from "../../api/tmdb-api";
import { AuthContext } from "../../contexts/authContext";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery(
    "genres",
    getMovieGenres,
    { keepPreviousData : true }
  );

  const { token } = useContext(AuthContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const genreOptions = genres.map((g, index) => (
    <MenuItem key={index} value={g.id}>
      {g.name}
    </MenuItem>
  ));

  const handleUserInput = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleGenreChange = (e) => {
    handleUserInput(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleUserInput(e, "sort", e.target.value);
  };

  const handleYearChange = (e) => {
    handleUserInput(e, "year", e.target.value);
  };

  const handleCountryChange = (e) => {
    handleUserInput(e, "country", e.target.value);
  };

  const handleLanguageChange = (e) => {
    handleUserInput(e, "lang", e.target.value);
  };

  return (
    <>
      {token ? (
        <>
      
          <Card sx={styles.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h1">
                <FilterAltIcon fontSize="large" />
                Filter the movies.
              </Typography>
            
              <FormControl sx={styles.formControl}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre-select"
                  value={props.genreFilter}
                  onChange={handleGenreChange}
                >
                  {genreOptions}
                </Select>
              </FormControl>
              <FormControl sx={styles.formControl}>
                <InputLabel id="sort-label">Origin Country</InputLabel>
                <TextField
                sx={styles.formControl}
                id="filled-search"
                type="search"
                value={props.countryFilter}
                variant="filled"
                onChange={handleCountryChange}
              />
              </FormControl>
              <FormControl sx={styles.formControl}>
                <InputLabel id="sort-label">Release Year</InputLabel>
                <TextField
                sx={styles.formControl}
                id="filled-search"
                type="search"
                value={props.yearFilter}
                variant="filled"
                onChange={handleYearChange}
              />
              </FormControl>
              <FormControl sx={styles.formControl}>
                <InputLabel id="sort-label">Language</InputLabel>
                <TextField
                sx={styles.formControl}
                id="filled-search"
                type="search"
                value={props.languageFilter}
                variant="filled"
                onChange={handleLanguageChange}
              />
              </FormControl>
            </CardContent>
          </Card>
          <Card sx={styles.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h1">
                <SortIcon fontSize="large" />
                Sort the movies.
              </Typography>
              <FormControl sx={styles.formControl}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={props.sortBy}
                  onChange={handleSortChange}
                >
                  <MenuItem value={""}>Clear</MenuItem>
                  <MenuItem value={"primary_release_date.asc"}>
                    Release Date (Asc)
                  </MenuItem>
                  <MenuItem value={"primary_release_date.desc"}>
                    Release Date (Desc)
                  </MenuItem>
                  <MenuItem value={"revenue.asc"}>Revenue (Asc)</MenuItem>
                  <MenuItem value={"revenue.desc"}>Revenue (Desc)</MenuItem>
                  <MenuItem value={"vote_average.asc"}>
                    Vote Average (Asc)
                  </MenuItem>
                  <MenuItem value={"vote_average.desc"}>
                    Vote Average (Desc)
                  </MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          </>
      ) : (
        <p> Please Log in to use Filters</p>
      )}
    </>
  );
}
