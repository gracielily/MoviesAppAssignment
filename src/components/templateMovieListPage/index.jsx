import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle } from "@mui/material";
import FeaturedCard from "../featuredCard";

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
  setResultsPage,
  totalResults,
  currentPage,
  updateQuery,
  totalPages,
  hidePagination,
  type,
  displayFilter,
  displayFeature,
}) {
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortBy, setSortBy] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [voteAverageGteFilter, setVoteAverageGteFilter] = useState("");
  const [voteAverageLteFilter, setVoteAverageLteFilter] = useState("");

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

    if (type === "voteAvgGte") {
      setVoteAverageGteFilter(value);
      updateQuery({ "vote_average.gte": value });
    }

    if (type === "voteAvgLte") {
      setVoteAverageLteFilter(value);
      updateQuery({ "vote_average.lte": value });
    }
  };

  const handlePaginationChange = (event, value) => {
    setResultsPage(value);
  };

  return (
    <>
      <Grid container sx={styles.root}>
        {title ? (
          <Grid item xs={12}>
            <Header title={title} />
          </Grid>
        ) : null}

        {displayFeature && movies?.length ? (
          <Grid item xs={12} sx={{ marginBottom: "20px" }}>
            <FeaturedCard movie={movies[0]} type={type} />
          </Grid>
        ) : null}

        {movies?.length ? (
          <Grid item container spacing={5} alignItems="stretch">
            <MovieList
              action={action}
              movies={movies}
              type={type}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Alert severity="warning">
              No {type === "tv" ? "Tv Shows" : "Movies"} could be found.
            </Alert>
          </Grid>
        )}

        {!hidePagination && (
          <>
          <Grid container alignContent="center" sx={{mt: 3}}>
            <Typography variant="h6">{totalResults} Results found.</Typography>
            {/* page number can be no more than 500 according to TMBD API */}
            <Pagination
              count={totalPages <= 500 ? totalPages : 500}
              page={currentPage}
              onChange={handlePaginationChange}
            />
            </Grid>
          </>
        )}
      </Grid>
      {displayFilter ? (
        <>
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
              languageFilter={languageFilter}
              yearFilter={yearFilter}
              sortBy={sortBy}
              voteAverageGteFilter={voteAverageGteFilter}
              voteAverageLteFilter={voteAverageLteFilter}
            />
          </Drawer>
        </>
      ) : null}
    </>
  );
}
export default MovieListPageTemplate;
