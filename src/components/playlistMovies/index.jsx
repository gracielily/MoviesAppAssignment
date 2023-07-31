import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import img from "../../images/film-poster-placeholder.png";
import StarRateIcon from "@mui/icons-material/StarRate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
  { id: "backdrop_path", label: "", minWidth: 150 },
  { id: "title", label: "Title", minWidth: 170 },
  {
    id: "vote_average",
    label: "Rating",
    minWidth: 170,
  },
  {
    id: "release_date",
    label: "Release Date",
    minWidth: 170,
    align: "right",
  },
];

const PlaylistMovies = ({ movies, removeFromPlaylist }) => {

  return (
    <>
      {movies.length ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Typography variant="h5">Playlist Movies</Typography>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell key="movie-options" align="right">
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {(() => {
                              if (column.id === "backdrop_path") {
                                return (
                                  <img
                                    src={
                                      value
                                        ? `https://image.tmdb.org/t/p/w500/${value}`
                                        : img
                                    }
                                    width="150px"
                                  />
                                );
                              } else if (column.id === "title") {
                                return (
                                  <Link to={`/movies/${row.id}`}>{value}</Link>
                                );
                              } else if (column.id === "vote_average") {
                                return (
                                  <Typography variant="h6" component="p">
                                    <StarRateIcon fontSize="small" />
                                    {"  "} {value}{" "}
                                  </Typography>
                                );
                              } else {
                                return value;
                              }
                            })()}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button onClick={(e) => {e.preventDefault(); removeFromPlaylist(row.id)}}>
                          <HighlightOffIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <p>No movies in playlist</p>
      )}
    </>
  );
};

export default PlaylistMovies;
