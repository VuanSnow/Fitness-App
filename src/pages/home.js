import React, { Component } from "react";
import Navbar from "../components/Navbar";
import CustomerTable from "../components/CustomerTable";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Skeleton } from "antd";

class Home extends Component {
  state = {
    loading: null
  };

  componentDidMount() {
    this.props.fetchCustomers();
    this.setState({ loading: false });
  }

  renderContent() {
    switch (this.state.loading) {
      case false:
        return (
          <div className='box-container'>
            <CustomerTable />
          </div>
        );
      default:
        return (
          <div>
            <Skeleton active />
          </div>
        );
    }
  }
  render() {
    return (
      <div className='container'>
        <Navbar />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(Home);
