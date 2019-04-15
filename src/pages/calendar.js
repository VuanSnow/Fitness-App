import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
import moment from "moment";
import BigCalendar from "react-big-calendar";

class Calendar extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const Event = [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "SomeTitle"
      }
    ];

    return (
      <div className='container'>
        <Navbar />
        <div
          id='calendar'
          className='box-container'
          style={{
            backgroundColor: "white",
            padding: "2em",
            borderRadius: "4px"
          }}
        >
          <BigCalendar
            localizer={localizer}
            events={Event}
            startAccessor='start'
            endAccessor='end'
            allDay='true'
          />
        </div>
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
)(Calendar);
