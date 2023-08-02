import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

function MovieListPageTemplate({
  movies,
  title,
  action,
  isUpcoming,
  setResultsPage,
  totalResults,
  currentPage,
  updateQuery,
  totalPages,
  hidePagination,
  type,
}) {
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortBy, setSortBy] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (type, value) => {
    if (type === "sort") {
      setSortBy(value);
      updateQuery({ sort_by: value });
    }
    if (type === "genre") {
      setGenreFilter(value);
      updateQuery({ with_genres: value });
    }
    if (type === "lang") {
      setLanguageFilter(value);
      updateQuery({ language: value });
    }
    if (type === "year") {
      setYearFilter(value);
      updateQuery({ year: value });
    }
    if (type === "country") {
      console.log("COUNTRY", value);
      setCountryFilter(value);
      updateQuery({ with_origin_country: value });
    }
  };

  const handlePaginationChange = (event, value) => {
    setResultsPage(value);
  };

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList
            action={action}
            movies={movies}
            isUpcoming={isUpcoming}
            type={type}
          />
        </Grid>
        {!hidePagination && (
          <>
            <Typography>{totalResults} Results found.</Typography>
            {/* page number can be no more than 500 according to TMBD API */}
            <Pagination
              count={totalPages <= 500 ? totalPages : 500}
              page={currentPage}
              onChange={handlePaginationChange}
            />
          </>
        )}
      </Grid>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          genreFilter={genreFilter}
          countryFilter={countryFilter}
          languageFilter={languageFilter}
          yearFilter={yearFilter}
          sortBy={sortBy}
        />
      </Drawer>
    </>
  );
}
export default MovieListPageTemplate;
