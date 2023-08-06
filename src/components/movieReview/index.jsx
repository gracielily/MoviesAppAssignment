import React from "react";
import { Typography, Paper } from "@mui/material";

const MovieReview =  ({ review }) => {
  return (
    <>
    <Paper sx={{padding: "20px"}}>
      
      <p>{review.content} </p>
      <Typography variant="h6" color="primary" textAlign="center"> - {review.author} </Typography>
      </Paper>
    </>
  );
};
export default MovieReview
