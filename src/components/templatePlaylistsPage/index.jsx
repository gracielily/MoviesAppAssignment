import React, { useContext } from "react";
import PlaylistList from "../playlistsList";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { Typography, Grid } from "@mui/material";
import Header from "../headerMovieList";

const TemplatePlaylistsPage = () => {
  const [open, setOpen] = React.useState(false);
  const context = useContext(MoviesContext);

  const defaultValues = {
    title: "",
    theme: "",
    description: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: defaultValues });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (playlistData) => {
    await context.createPlaylist(playlistData);
    setOpen(false);
    reset();
  };

  return (
    <>
      <Header title="Playlists" />

      <Grid xs={12} sx={{padding: "20px"}}>
      <Button variant="outlined" onClick={handleClickOpen} sx={{marginBottom: "20px"}}>Create Playlist</Button>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Create Playlist</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill out the form below to create a new playlist.
            </DialogContentText>

            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  fullWidth
                  variant="standard"
                  required
                  onChange={onChange}
                  value={value}
                  error={errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="theme"
              control={control}
              rules={{ required: "Theme is required" }}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="dense"
                  id="theme"
                  label="Theme"
                  fullWidth
                  variant="standard"
                  required
                  onChange={onChange}
                  value={value}
                  error={errors.theme}
                  helperText={errors.theme?.message}
                />
              )}
            />
            
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  required
                  onChange={onChange}
                  value={value}
                  error={errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
      
      <PlaylistList />
      </Grid>
    </>
  );
};

export default TemplatePlaylistsPage;
