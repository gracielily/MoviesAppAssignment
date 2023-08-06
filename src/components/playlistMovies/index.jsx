import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Typography, Button, Alert } from "@mui/material";
import img from "../../images/film-poster-placeholder.png";
import StarRateIcon from "@mui/icons-material/StarRate";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const columns = [
  { id: "backdrop_path", label: "" },
  { id: "title", label: "Title" },
  {
    id: "vote_average",
    label: "Rating",
  },
  {
    id: "release_date",
    label: "Release Date",
  },
];

const PlaylistMovies = ({ movies, removeFromPlaylist }) => {
  return (
    <>
      {movies.length ? (
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
                <TableCell key="movie-options">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          component={Link}
                          to={`/movies/${row.id}`}
                          sx={{ textDecoration: "none" }}
                        >
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
                            }
                            if (column.id === "vote_average") {
                              return (
                                <Typography variant="h6" component="p" color="orange">
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
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromPlaylist(row.id);
                        }}
                      >
                        <HighlightOffIcon color="error" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">
          You currently have no movies in this playlist.{" "}
          <Link to={"/"} style={{ color: "inherit" }}>
            Add some here.
          </Link>
        </Alert>
      )}
    </>
  );
};

export default PlaylistMovies;
