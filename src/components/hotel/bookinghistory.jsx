import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const Bookinghistory=()=>{
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: '#545001',
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
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
    return(
        <>
<Grid container>
<Grid xs={12} md={12} sm={12} item style={{boxShadow:'0 0 15px  #545001',marginTop:'70px'}}>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>S.NO</StyledTableCell>
            <StyledTableCell >Booker Name</StyledTableCell>
            <StyledTableCell >Start Date</StyledTableCell>
            <StyledTableCell >End Date</StyledTableCell>
            <StyledTableCell >Booking Date</StyledTableCell>
            <StyledTableCell >Room Type</StyledTableCell>
            <StyledTableCell >Room No</StyledTableCell>
            <StyledTableCell >Total Cost</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
</Grid>
</Grid>

</>
    )

}
export default Bookinghistory; 