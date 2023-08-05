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

const ActorCredits = ({ credits }) => {
  credits?.cast.map((credit) => {
    if(credit.name) {
      credit.title = credit.name
    }
  })
  const columns = [
    { id: "backdrop_path", label: "", minWidth: 150 },
      { id: "title", label: "Title", minWidth: 170 },
      { id: "media_type", label: "Media", minWidth: 100 },
      {
        id: "character",
        label: "Character",
        minWidth: 170,
      },
    ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant="h5" sx={{marginTop: "30px"}} textAlign="center">Credits</Typography>
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
            {credits.cast
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} component={Link} to={`/movies/${row.id}`} style={{ textDecoration: "none"}}>
                          {(() => {
                            if (column.id === "backdrop_path") {
                            return <img
                            src={ value ? `https://image.tmdb.org/t/p/w500/${value}` : img}
                            width="150px"
                          />;
                              }
                            else if (column.id === "title") {
                              return value;
                            } else if (column.id === "media_type") {
                              return value.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
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
        count={credits.cast.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ActorCredits;
