import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IProps {
  list: Array<any>
}

const RaceList = (props: IProps) => {
  const { list } = props;
  const classes = useStyles();
  // list.map((v) => console.log(v.advertised_start.seconds > Date.now() / 1000))

  return (
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="caption table">
      <TableHead>
          <TableRow>
            <TableCell>Start time</TableCell>
            <TableCell align="right">Meeting name</TableCell>
            <TableCell align="right">Race number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            list.map((v, k) => {
               return (k <= 4 && <TableRow key={v.race_id}>
                <TableCell component="th" scope="row">
                  {new Date(v.advertised_start.seconds * 1000).toLocaleTimeString("en-AU")}
                </TableCell>
                <TableCell align="right">{v.meeting_name}</TableCell>
                <TableCell align="right">{v.race_number}</TableCell>
              </TableRow>)
            })
          }
      </TableBody>
    </Table>
    </TableContainer>
  )




};

export default RaceList
