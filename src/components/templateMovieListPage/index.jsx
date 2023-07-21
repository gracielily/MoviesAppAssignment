import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieList from "../movieList";
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

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

function MovieListPageTemplate({ movies, title, action, isUpcoming, setResultsPage, totalResults, currentPage }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);
  let displayedMovies = movies
    .filter((m) => {
      // movies have titles while shows have names
      const toSearch = m.title ? m.title : m.name;
      return toSearch.toLowerCase().search(titleFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      // genre data is different between list movies and movie details
      let genreIds;
      if(m.genres){
        genreIds = m.genres.map(g => g.id);
      } else {
        genreIds = m.genre_ids
      }
      return genreId > 0 ? genreIds.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  const handlePaginationChange = (event, value) => {
    setResultsPage(value)
  }

  return (
   <>
      <Grid container sx={styles.root}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={5}>
          <MovieList action={action} movies={displayedMovies} isUpcoming={isUpcoming} />
        </Grid>
        <Typography>{totalResults} Results found.</Typography>
        <Pagination count={500} page={currentPage} onChange={handlePaginationChange} />
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
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>  
  );
}
export default MovieListPageTemplate;
