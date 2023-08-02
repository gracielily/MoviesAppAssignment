import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Typography, CardMedia } from "@mui/material";
import img from "../../images/film-poster-placeholder.png";
import { useQuery } from "react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import StarRateIcon from "@mui/icons-material/StarRate";

const columns = [
  { id: "backdrop_path", label: "", minWidth: 150 },
  { id: "title", label: "Title", minWidth: 170 },
  {
    id: "vote_average",
    label: "Rating",
    minWidth: 170,
  },
  { id: "genre_ids", label: "Genres", minWidth: 100 },
  {
    id: "release_date",
    label: "Release Date",
    minWidth: 170,
    align: "right",
  },
];

const SimilarMovies = ({ movieId }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, error, isLoading, isError, refetch } = useQuery(
    "similar",
    () => getSimilarMovies(movieId), { keepPreviousData : true }
  );

  React.useEffect(() => {
    refetch(movieId);
  }, [movieId]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const similarMovies = data ? data.results : []
  return (
    <>
    {similarMovies && (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h5">Similar Movies</Typography>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
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
                              return <Typography variant="h6" component="p">
                              <StarRateIcon fontSize="small" />
                              {"  "} {value}{" "}
                            </Typography>
                            } else {
                              return value;
                            }
                          })()}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={similarMovies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    )}
    </>
  );
};

export default SimilarMovies;
