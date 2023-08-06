import React from "react";
import SearchMovieForm from "../SearchForm";
import { searchForMovie } from "../../api/tmdb-api";
import MovieList from "../movieList";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import { Typography, Grid, Paper, Alert } from "@mui/material";

const TemplateSearchPage = () => {
  const [mediaType, setMediaType] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const getSearchResults = async (data) => {
    setMediaType(data.media_type === "tv" ? "tvshows" : "movies");
    if (data.media_type === "tv") {
      data.first_air_date_year = data.year;
    }
    const fetchResults = await searchForMovie(data);
    setSearchResults(fetchResults);
    setFormSubmitted(true);
  };

  return (
    <>
      <SearchMovieForm formSubmitted={getSearchResults} />
      {searchResults?.results?.length ? (
        <>
          <Grid container sx={{ marginTop: "20px" }}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                component="h3"
                textAlign="center"
                sx={{ marginBottom: "20px" }}
              >
                Search Results
              </Typography>
              <Grid container sx={{ marginTop: "20px" }} alignContent="center">
                <MovieList
                  movies={searchResults.results}
                  action={(movie) => {
                    return <AddToFavouritesIcon el={movie} type={mediaType} />;
                  }}
                  type={mediaType}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {formSubmitted ? (
            <Alert severity="warning">
              No Results found for submitted search
            </Alert>
          ) : null}
        </>
      )}
    </>
  );
};

export default TemplateSearchPage;
