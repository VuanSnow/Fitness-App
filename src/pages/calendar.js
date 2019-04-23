import React, { Component } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import axios from "axios";
import BigCalendar from "react-big-calendar";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  //Get all trainings from endpoint and add to state.events
  async componentDidMount() {
    const trainings = await axios
      .get(`http://customerrest.herokuapp.com/api/trainings`)
      .then(res => res.data.content);

    let events = [];

    //For each training add new event
    trainings.forEach(training => {
      const { date, activity, duration } = training;
      events.push({
        start: moment(date).toDate(),
        end: moment(date)
          .add(duration, "minutes")
          .toDate(),
        title: activity
      });
    });

    this.setState({ events });
  }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
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
            events={this.state.events}
            startAccessor='start'
            endAccessor='end'
            allDay='true'
          />
        </div>
      </div>
    );
  }
}
