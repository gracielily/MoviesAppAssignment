import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "../reviewForm/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  FormGroup,
  IconButton,
} from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";

const FantasyMovieForm = ({ genreChoices }) => {
  const defaultValues = {
    title: "",
    overview: "",
    genres: [],
    runtime: 0,
    productionCompany: "",
    cast: [{ actor: "", role: "", description: "" }],
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: defaultValues });
  const navigate = useNavigate();
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [posterImg, setPosterImg] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast",
  });

  const handleGenresChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenres(typeof value === "string" ? value.split(",") : value);
  };

  const handlePosterImgChange = (event) => {
    const file = event.target.files[0];
    setPosterImg(file);
  };

  const handleSnackClose = (event) => {
    setOpen(false);
    navigate("/fantasy-movies");
  };

  const onSubmit = (fantasyMovie) => {
    if (posterImg) {
      fantasyMovie.posterImg = posterImg;
    }
    context.createFantasyMovie(fantasyMovie);
    setOpen(true);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Create your fantasy movie
      </Typography>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h4">Fantasy movie created</Typography>
        </Alert>
      </Snackbar>
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="title"
              label="Movie Title"
              autoFocus
            />
          )}
        />
        {errors.title && (
          <Typography variant="h6" component="p">
            {errors.title.message}
          </Typography>
        )}
        <Controller
          name="overview"
          control={control}
          rules={{
            required: "Overview cannot be empty.",
            minLength: { value: 10, message: "Overview is too short" },
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
              label="Movie Overview"
              id="overview"
              multiline
              minRows={10}
            />
          )}
        />
        {errors.review && (
          <Typography variant="h6" component="p">
            {errors.overview.message}
          </Typography>
        )}

        <Controller
          control={control}
          name="genres"
          render={() => (
            <TextField
              id="select-genres"
              select
              variant="outlined"
              label="Genres Select"
              required
              sx={{ m: 1, width: 300 }}
              SelectProps={{
                multiple: true,
                value: genres,
                onChange: handleGenresChange,
              }}
            >
              {genreChoices?.map((genre) => (
                <MenuItem key={genre.name} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="runtime"
          control={control}
          rules={{ required: "Runtime is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              type="number"
              onChange={onChange}
              value={value}
              id="runtime"
              label="Runtime in minutes"
              autoFocus
            />
          )}
        />
        {errors.runtime && (
          <Typography variant="h6" component="p">
            {errors.runtime.message}
          </Typography>
        )}

        <Controller
          name="productionCompany"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              onChange={onChange}
              value={value}
              id="production-company"
              label="Production Company"
              autoFocus
            />
          )}
        />

        {fields.map((field, index) => {
          return (
            <FormGroup row key={index}>
              <Controller
                name={`cast.${index}.actor`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ width: "25ch" }}
                    variant="outlined"
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    id="actor"
                    label="Actor"
                    autoFocus
                  />
                )}
              />
              <Controller
                name={`cast.${index}.role`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ width: "25ch" }}
                    variant="outlined"
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    id="role"
                    label="Role"
                  />
                )}
              />

              <Controller
                name={`cast.${index}.description`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ width: "25ch" }}
                    variant="outlined"
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    id="description"
                    label="Description"
                  />
                )}
              />
              {fields.length > 1 && (
                <>
                  <Button variant="contained" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </>
              )}
            </FormGroup>
          );
        })}

        <TextField
          variant="standard"
          type="file"
          onChange={handlePosterImgChange}
          InputProps={{
            endAdornment: <FileUploadOutlined />,
          }}
        />

        <Box sx={styles.buttons}>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => append({ actor: "", role: "", description: "" })}
          >
            Add Cast Member
          </Button>

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
              reset(defaultValues);
              setGenres([]);
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FantasyMovieForm;
