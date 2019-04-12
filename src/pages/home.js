import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomerTable from '../components/CustomerTable';

export default class Home extends Component {
  state = {
    customers: []
  };

  componentDidMount() {
    axios.get(`https://customerrest.herokuapp.com/api/customers`).then(res => {
      const customers = res.data.content;
      this.setState({ customers });
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>home</h1>
        <CustomerTable data={this.state.customers} />
      </div>
    );
  }
}
