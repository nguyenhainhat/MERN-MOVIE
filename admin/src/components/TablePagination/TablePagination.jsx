import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import StarIcon from "@mui/icons-material/Star";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LockIcon from "@mui/icons-material/Lock";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import "./tablePagination.scss";
import {
  deleteCategory,
  deleteComment,
  deleteUser,
  putCategory,
} from "../../api/constants";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailTvAdd } from "../../features/updateSeason/updateSeasonSlice";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const TableHome = (props) => {
  const { item, type } = props;

  const { category } = useParams();

  const infoGrid = [
    "ID",
    "TITLE",
    "CATEGORY",
    `${type === "treding" ? "POPULARITY" : "RATING"}`,
    "STATUS",
  ];

  const movieGrid = [
    "ID",
    "TITLE",
    "RATING",
    "POPULARITY",
    "STATUS",
    "CREATED DATE",
    "UPDATED AT",
    "ACTIONS",
  ];

  const tvGrid = [
    "ID",
    "TITLE",
    "RATING",
    "POPULARITY",
    "STATUS",
    "SEASON",
    "EPISODES",
    "CREATED DATE",
    "UPDATED AT",
    "ACTIONS",
  ];

  const userGrid = [
    "USERNAME",
    "EMAIL",
    "COMMENTS",
    "CREATED DATE",
    "UPDATED AT",
    "ACTIONS",
  ];

  const commentGrid = [
    "USERNAME",
    "EMAIL",
    "COMMENTS",
    "TITLE",
    "CREATED DATE",
    "UPDATED AT",
    "ACTIONS",
  ];

  const categories = () => {
    if (type === "movie") {
      return movieGrid.map((item, index) => (
        <TableCell key={index}>{item}</TableCell>
      ));
    }
    if (type === "tv") {
      return tvGrid.map((item, index) => (
        <TableCell key={index}>{item}</TableCell>
      ));
    }
    if (type === "user") {
      return userGrid.map((item, index) => (
        <TableCell key={index}>{item}</TableCell>
      ));
    }
    if (type === "comment") {
      return commentGrid.map((item, index) => (
        <TableCell key={index}>{item}</TableCell>
      ));
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - item.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="topType_item">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "45%" }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {type === "movie" ||
              type === "tv" ||
              type === "user" ||
              type === "comment"
                ? categories()
                : infoGrid.map((item, index) => (
                    <TableCell key={index}>{item}</TableCell>
                  ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? item.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : item
            ).map((row) => {
              const handleLock = async () => {
                const putStatus =
                  row.status === "visible"
                    ? (row.status = "Hidden")
                    : (row.status = "visible");
                const put = await putCategory(category, row._id, {
                  status: putStatus,
                });
                console.log(put);
              };

              const handleDelete = async () => {
                switch (type) {
                  case "user":
                    return await deleteUser(row._id);
                  case "comment":
                    return await deleteComment(row._id);
                  default:
                    return await deleteCategory(category, row._id);
                }
              };

              return (
                <TableRow
                  key={
                    row.idMovie ||
                    row.idTv ||
                    row?.username ||
                    row.user?.username
                  }
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.idMovie ||
                      row.idTv ||
                      row?.username ||
                      row.user?.username}
                  </TableCell>
                  {type === "user" || type === "comment" ? (
                    <>
                      <TableCell>{row.email || row?.user?.email}</TableCell>
                      <TableCell>
                        {type === "user" ? row.comment?.length : row?.comment}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>
                        {type === "movie" || type === "tv"
                          ? row.vote_average
                          : row.type}
                      </TableCell>
                    </>
                  )}

                  {type === "vote" && (
                    <TableCell>
                      {row.vote_average}
                      <StarIcon
                        style={{ marginLeft: "4px", fontSize: "18px" }}
                      />
                    </TableCell>
                  )}

                  {(type === "trending" ||
                    type === "movie" ||
                    type === "tv") && (
                    <TableCell>
                      {row.popularity}
                      <PeopleOutlineIcon
                        style={{ marginLeft: "4px", fontSize: "18px" }}
                      />
                    </TableCell>
                  )}

                  {type === "comment" && (
                    <TableCell>{row.movie?.title || row.tv?.title}</TableCell>
                  )}

                  {(type === "tv" ||
                    type === "movie" ||
                    type === "trending" ||
                    type === "vote") && (
                    <>
                      <TableCell>{row.status}</TableCell>
                    </>
                  )}

                  {type === "tv" && (
                    <>
                      <TableCell>{row?.seasons?.length}</TableCell>
                      <TableCell>{row?.episodes?.length}</TableCell>
                    </>
                  )}

                  {(type === "movie" ||
                    type === "tv" ||
                    type === "user" ||
                    type === "comment") && (
                    <>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.updatedAt}</TableCell>
                      <TableCell>
                        <div className="table_icon">
                          {(type === "movie" || type === "tv") && (
                            <>
                              <LockIcon onClick={handleLock} />
                              <Link to={`/${type}/update/${row._id}`}>
                                <CreateIcon
                                  onClick={() =>
                                    dispatch(detailTvAdd(row.title))
                                  }
                                />
                              </Link>
                            </>
                          )}
                          <DeleteIcon onClick={handleDelete} />
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 40 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={item.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TableHome;
