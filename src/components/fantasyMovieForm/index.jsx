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
import { FormGroup } from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";
import { Paper, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [releaseDate, setReleaseDate] = useState(dayjs());
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (fantasyMovie) => {
    setIsSubmitting(true)
    if (posterImg) {
      fantasyMovie.posterImg = posterImg;
    }
    fantasyMovie.genres = genres;
    fantasyMovie.releaseDate = releaseDate.format("YYYY-MM-DD");
    await context.createFantasyMovie(fantasyMovie);
    setIsSubmitting(false)
    setOpen(true);
    setTimeout(()=> {
      navigate("/fantasy-movies");
    }, 2000)
    
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography variant="h4" textAlign="center" sx={{ marginTop: "50px" }}>
        Create a Fantasy Movie
      </Typography>
      <Typography variant="h6" textAlign="center" color="textSecondary">
        Fill out the form below to create your fantasy movie.
      </Typography>
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
      >
        <Alert severity="success" variant="filled">
          <Typography variant="h4">Fantasy movie created</Typography>
        </Alert>
      </Snackbar>
      <Paper sx={{ marginTop: "20px", padding: "20px" }}>
        <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid xs={12} item>
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
                  error={errors.title}
                  helperText={errors.title?.message}
                  autoFocus
                />
              )}
            />
          </Grid>
          <Grid xs={12} item>
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
                  error={errors.overview}
                  helperText={errors.overview?.message}
                />
              )}
            />
          </Grid>

          <Grid xs={12}>
            <Controller
              control={control}
              name="genres"
              render={() => (
                <TextField
                  id="select-genres"
                  select
                  variant="outlined"
                  label="Genres Select"
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
          </Grid>

          <Grid xs={12}>
            <Controller
              name="runtime"
              control={control}
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
                />
              )}
            />
          </Grid>

          <Grid xs={12}>
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
                />
              )}
            />
          </Grid>
          <Grid xs={12} sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Release Date"
                value={releaseDate}
                onChange={(newValue) => setReleaseDate(newValue)}
                required
              />
            </LocalizationProvider>
          </Grid>
           <Typography variant="h6">Add Cast Members</Typography>     
          {fields.map((field, index) => {
            return (
              <Grid>
                <FormGroup row key={index}>
                  <Grid item>
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
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
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
                  </Grid>

                  <Grid item>
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
                  </Grid>

                  {fields.length > 1 && (
                    <>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                        sx={{ height: 58, marginTop: "15px" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </>
                  )}
                </FormGroup>
              </Grid>
            );
          })}

          <Grid xs={12}>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => append({ actor: "", role: "", description: "" })}
            >
              Add Cast Member
            </Button>
          </Grid>
          <Grid sx={{marginTop: "20px", marginBottom: "30px"}}>
          <Typography variant="h6">Upload Poster Image</Typography>
          <TextField
            variant="standard"
            type="file"
            onChange={handlePosterImgChange}
            InputProps={{
              endAdornment: <FileUploadOutlined />,
            }}
          />
          </Grid>

          <Box sx={styles.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={styles.submit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit" }
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="secondary"
              sx={styles.submit}
              onClick={() => {
                reset(defaultValues);
                setGenres([]);
                setReleaseDate(dayjs());
              }}
              disabled={isSubmitting}
            >
              Reset
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default FantasyMovieForm;
