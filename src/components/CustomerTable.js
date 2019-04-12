import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class CustomerTable extends Component {
  componentWillReceiveProps(props) {
    console.log(props);
  }

  render() {
    function Customers(props) {
      return props.data;
    }

    const styles = theme => ({
      root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
      },
      table: {
        minWidth: 700
      }
    });
    return (
      <Paper className={styles.root}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Firstname</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {this.props.data.map((customer, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {customer.firstname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {customer.lastname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {customer.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
