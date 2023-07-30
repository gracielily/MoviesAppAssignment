import React from "react";
import SearchMovieForm from "../SearchForm";
import { searchForMovie } from "../../api/tmdb-api";
import MovieList from "../movieList";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import { Typography, Grid, Paper } from "@mui/material";

const TemplateSearchPage = ({ children }) => {
  const [mediaType, setMediaType] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const getSearchResults = async (data) => {
    setMediaType(data.media_type === "tv" ? "tvshows" : "movies");
    const fetchResults = await searchForMovie(data);
    setSearchResults(fetchResults);
  };

  return (
    <>
      <SearchMovieForm formSubmitted={getSearchResults} />
      {searchResults?.results?.length ? (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Paper component="div">
                <Typography variant="h4" component="h3">
                  Search Results
                </Typography>
              </Paper>
            </Grid>
            <Grid item container spacing={5}>
              <MovieList
                movies={searchResults.results}
                action={(movie) => {
                  return <AddToFavouritesIcon el={movie} type={mediaType} />;
                }}
                type={mediaType}
              />
            </Grid>
            
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default TemplateSearchPage;
