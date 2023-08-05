import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import styles from "../reviewForm/styles";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Grid,
  Paper,
  Alert,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SearchMovieForm = ({ formSubmitted }) => {
  const defaultValues = {
    query: "",
    include_adult: false,
    language: "",
    media_type: "movie",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: defaultValues });
  const [year, setYear] = useState(null);

  const onSubmit = async (searchData) => {
    searchData.year = year ? year.format("YYYY") : year;
    formSubmitted(searchData);
  };

  return (
    <>
      <Typography variant="h4" textAlign="center" sx={{ marginTop: "50px" }}>
        Search For a Movie or TV Show
      </Typography>
      <Typography variant="h6" textAlign="center" color="textSecondary">
        Fill out the form below to search for a Movie/TV Show.
      </Typography>
      <Paper sx={{marginTop: "20px" }}>
      {errors.query ? (<Alert severity="error">{errors.query.message}</Alert>) : null}
        <Grid container sx={{ padding: "20px"}} justifyContent="center">
          
          <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid xs={12} item>
              <Controller
                name="query"
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
                    label="Title"
                    autoFocus
                  />
                )}
              />

            </Grid>
            <Grid xs={12} item>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Media Type
                </FormLabel>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="media_type"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="movie"
                        control={<Radio />}
                        label="Movie"
                      />
                      <FormControlLabel
                        value="tv"
                        control={<Radio />}
                        label="Tv Show"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={year}
                  onChange={(newValue) => setYear(newValue)}
                  slotProps={{
                    actionBar: {
                      actions: ["clear"],
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid xs={12} item>
              <Controller
                name="language"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    sx={{ width: "40ch" }}
                    variant="outlined"
                    margin="normal"
                    onChange={onChange}
                    value={value}
                    id="language"
                    label="Language"
                  />
                )}
              />
            </Grid>

            <Grid xs={12} item>
              <Controller
                name="include_adult"
                control={control}
                render={({ field: props }) => (
                  <>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Include Adult
                    </FormLabel>
                    <Checkbox
                      {...props}
                      checked={props.value}
                      onChange={(e) => props.onChange(e.target.checked)}
                    />
                  </>
                )}
              />
            </Grid>

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
                  reset(defaultValues);
                  setYear(null);
                }}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Grid>
      </Paper>
    </>
  );
};

export default SearchMovieForm;
