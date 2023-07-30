import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Select, Button, MenuItem } from "@mui/material";

const AddToPlaylistIcon = ({ movie }) => {
  const {playlists, addMovieToPlaylist} = useContext(MoviesContext);
  const [chosenPlaylist, setChosenPlaylist] = React.useState(playlists?.length ? playlists[0].id : "");
  const [open, setOpen] = React.useState(false);

  const onUserSubmit = () => {
    addMovieToPlaylist(chosenPlaylist, movie.id);
    setOpen(false)
  };

  const handlePlaylistSelect = (el) => {
    setChosenPlaylist(el.target.value);
  };

  const onUserSelect = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const playlistOptions = playlists?.map((pl, index) => (
    <MenuItem key={index} value={pl.id}>
      {pl.title}
    </MenuItem>
  ));

  return (
    <>
      {playlists?.length ? (
        <>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Select Playlist</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Choose playlist to add movie to
              </DialogContentText>

              <Select
                labelId="playlists-label"
                id="playlist-select"
                value={chosenPlaylist}
                onChange={handlePlaylistSelect}
              >
                {playlistOptions}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={onUserSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>

          <IconButton aria-label="add to playlist" onClick={onUserSelect}>
            <PlaylistAddIcon color="primary" fontSize="large" />
          </IconButton>
        </>
      ) : null}
    </>
  );
};

export default AddToPlaylistIcon;
