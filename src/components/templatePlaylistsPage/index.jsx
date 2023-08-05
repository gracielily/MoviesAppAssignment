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
import { Typography } from "@mui/material";

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
      <Button variant="outlined" onClick={handleClickOpen}>Create Playlist</Button>

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
                />
              )}
            />
            {errors.title && (
              <Typography variant="p" component="p">
                {errors.title.message}
              </Typography>
            )}
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
                />
              )}
            />
            {errors.title && (
              <Typography variant="p" component="p">
                {errors.title.message}
              </Typography>
            )}
            <Controller
              name="description"
              control={control}
              defaultValue=""
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
    </>
  );
};

export default TemplatePlaylistsPage;
