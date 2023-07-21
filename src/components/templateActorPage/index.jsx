import React from "react";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { Typography } from "@mui/material";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
};

const TemplateActorPage = ({ children }) => {
  return (
    <>
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div sx={styles.gridListRoot}>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
