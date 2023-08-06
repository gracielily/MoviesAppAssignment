import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getMovieGenres, getLanguages } from "../../api/tmdb-api";
import { AuthContext } from "../../contexts/authContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    minWidth: 250,
  },
};

export default function FilterMoviesCard(props) {
  const {
    data: genres_data,
    error,
    isLoading,
    isError,
  } = useQuery("genres", getMovieGenres, { keepPreviousData: true });

  const { data: languages_data } = useQuery("languages", getLanguages, {
    keepPreviousData: true,
  });

  const { token } = useContext(AuthContext);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = genres_data.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const genreOptions = genres.map((g, index) => (
    <MenuItem key={index} value={g.id}>
      {g.name}
    </MenuItem>
  ));

  const languages = languages_data;
  const languagesOptions = languages?.map((l, index) => (
    <MenuItem key={index} value={l.iso_639_1}>
      {l.english_name}
    </MenuItem>
  ));

  const voteAverageOptions = Array.from(Array(10), (e, i) => i + 1).map((v) => (
    <MenuItem key={v} value={v}>
      {v}
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

  const handleYearChange = (value) => {
    props.onUserInput("year", value ? value.format("YYYY") : value);
  };

  const handleLanguageChange = (e) => {
    handleUserInput(e, "lang", e.target.value);
  };

  const handleVoteAverageGteChange = (e) => {
    handleUserInput(e, "voteAvgGte", e.target.value);
  };

  const handleVoteAverageLteChange = (e) => {
    handleUserInput(e, "voteAvgLte", e.target.value);
  };

  return (
    <>
      {token ? (
        <>
          <Card sx={styles.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h1">
                <FilterAltIcon fontSize="large" />
                Filter
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year"]}
                    label="Release Year"
                    value={props.yearFilter ? dayjs(props.yearFilter) : null}
                    maxDate={dayjs()}
                    onChange={(newValue) => handleYearChange(newValue)}
                    slotProps={{
                      actionBar: {
                        actions: ["clear"],
                      },
                    }}
                    sx={{ maxWidth: 250 }}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl sx={styles.formControl}>
                <InputLabel id="sort-label">Language</InputLabel>
                <Select
                  labelId="langauge-label"
                  id="language-select"
                  value={props.languageFilter ? props.languageFilter : "en"}
                  onChange={handleLanguageChange}
                >
                  {languagesOptions}
                </Select>
              </FormControl>

              <FormControl sx={styles.formControl}>
                <InputLabel id="vote-average-gte-label">
                  Vote Average (Greater Than/Equals)
                </InputLabel>
                <Select
                  labelId="vote-average-gte-label"
                  id="vote-average-gte-select"
                  value={props.voteAverageGteFilter}
                  onChange={handleVoteAverageGteChange}
                >
                  {voteAverageOptions}
                </Select>
              </FormControl>

              <FormControl sx={styles.formControl}>
                <InputLabel id="vote-average-lte-label">
                  Vote Average (Less Than/Equals)
                </InputLabel>
                <Select
                  labelId="vote-average-lte-label"
                  id="vote-average-lte-select"
                  value={props.voteAverageLteFilter}
                  onChange={handleVoteAverageLteChange}
                >
                  {voteAverageOptions}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
          <Card sx={styles.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h1">
                <SortIcon fontSize="large" />
                Sort
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
