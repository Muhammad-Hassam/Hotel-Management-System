import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { database, auth } from "../config/firebase";
import { useEffect, useState } from "react";

const Userbooking = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .ref("/HMS")
          .child("booking/")
          .on("value", (snapshot) => {
            if (snapshot.exists()) {
              setData(Object.values(snapshot.val()));
            } else {
              setData([]);
            }
          });
      }
    });
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#545001",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  const classes = useStyles();

  const booking = data.filter((data) => data.hotelid == auth.currentUser.uid);

  return (
    <>
      <Grid container>
        <Grid
          xs={12}
          md={12}
          sm={12}
          item
          style={{ boxShadow: "0 0 15px  #545001", marginTop: "70px" }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.NO</StyledTableCell>
                  <StyledTableCell>Booker Name</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>Booking Date</StyledTableCell>
                  <StyledTableCell>Room No</StyledTableCell>
                  <StyledTableCell>Room Type</StyledTableCell>
                  {/* <StyledTableCell >Total Cost</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {booking.map((user, index) => {
                  return (
                    <StyledTableRow key={user.name}>
                      <StyledTableCell component="th" scope="row">
                        {index}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.username}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.startdate}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.enddate}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {new Date(user.bookingdate).toLocaleDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        Room No {user.roomno}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.roomtype}
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">{user.totalcost}</StyledTableCell> */}
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default Userbooking;
