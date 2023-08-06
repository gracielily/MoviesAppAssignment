import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import ratings from "./ratingCategories";
import Alert from "@mui/material/Alert";


const ReviewForm = ({ movie }) => {
  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: "3",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);
  const context = useContext(MoviesContext);
  const [rating, setRating] = useState(3);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const onSubmit = (review) => {
    review.movieId = movie.id;
    review.rating = rating;
    context.addReview(movie, review);
  };


  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h4">
        Write a review
      </Typography>
      {movie.id in context.myReviews ? (<><Alert severity="info">Thank you for submitting your review</Alert></>) : (<>
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="author"
              label="Author's name"
              autoFocus
              error={errors.author}
              helperText={errors.author?.message}
            />
          )}
        />
        
        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={onChange}
              label="Review text"
              id="review"
              multiline
              minRows={10}
              error={errors.review}
              helperText={errors.review?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="select-rating"
              select
              variant="outlined"
              label="Rating Select"
              value={rating}
              onChange={handleRatingChange}
              helperText="Don't forget your rating"
              sx={{mb: 2, mt: 2}}
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
              setRating(3)
            }}
          >
            Reset
          </Button>
        </Box>
      </form> </>)}
      
    </Box>
  );
};

export default ReviewForm;
