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
import { Typography } from "@mui/material";
import img from "../../images/film-poster-placeholder.png";
import { useQuery } from "react-query";
import { getSimilarMedia } from "../../api/tmdb-api";
import Spinner from "../spinner";
import StarRateIcon from "@mui/icons-material/StarRate";

const SimilarMedia = ({ type, elId }) => {
  const columns = [
    { id: "backdrop_path", label: "" },
    { id: type === "movie" ? "title" : "name", label: "Title" },
    {
      id: "vote_average",
      label: "Rating"
    },
    {
      id: "popularity",
      label: "Popularity"
    },
    {
      id: type === "movie" ? "release_date" : "first_air_date",
      label: type === "movie" ? "Release Date" : "Date First Aired"
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, error, isLoading, isError, refetch } = useQuery(
    "similar",
    () => getSimilarMedia(type, elId),
    { keepPreviousData: true }
  );

  React.useEffect(() => {
    refetch(type, elId);
  }, [elId]);

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

  const similarMedia = data ? data.results : [];
  return (
    <>
      {similarMedia.length ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        component={Link}
                        to={`/${type === "movies" ? "movies" : "tvshows"}/${row.id}`}
                        sx={{ textDecoration: "none" }}
                      >
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
                                } else if (column.id === "vote_average") {
                                  return (
                                    <Typography
                                      variant="h6"
                                      component="p"
                                      color="orange"
                                    >
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
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={similarMedia.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : <p>No Similar Media could be found</p>}
    </>
  );
};

export default SimilarMedia;
