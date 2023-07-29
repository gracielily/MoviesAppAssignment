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
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const SearchMovieForm = ({formSubmitted}) => {
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
  const [year, setYear] = useState(dayjs());

  const onSubmit = async (searchData) => {
    searchData.year = year.format("YYYY");
    formSubmitted(searchData)
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Search For a Movie or TV Show
      </Typography>
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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

        {errors.title && (
          <Typography variant="h6" component="p">
            {errors.title.message}
          </Typography>
        )}

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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year"]}
            label="Year"
            value={year}
            onChange={(newValue) => setYear(newValue)}
          />
        </LocalizationProvider>

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
              setYear(dayjs());
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SearchMovieForm;
