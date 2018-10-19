import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
};

let id = 0;
function createData(title, user, time) {
  id += 1;
  return { id, title,user,time};
}

const data = [
  createData('Frozen yoghurt', 'Obama', '03:44'),
  createData('Ice cream sandwich', 'Bush', '12:55'),
  createData('Eclair', 'Trump', '19:22'),
  createData('Cupcake', 'Washington','20:00'),
  createData('Gingerbread', 'Putin', '22:24'),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell numeric>User</TableCell>
            <TableCell numeric>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.title}
                </TableCell>
                <TableCell numeric>{n.user}</TableCell>
                <TableCell numeric>{n.time}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}


export default withStyles(styles)(SimpleTable);