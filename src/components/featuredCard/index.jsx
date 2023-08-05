import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

function FeaturedCard({ movie, type }) {

  return (
    <Box component={Link} to={`/${type}/${movie.id}`}>
      <Card >
        <CardMedia
        sx={{height: "500px;"}}
          media="picture"
          image={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        />
        <Box padding="20px">
          <CardContent>
            <Typography variant="h5" gutterBottom>{movie.title ? movie.title : movie.name}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedCard;