import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: [
        {
          start: new Date(),
          end: new Date(moment().add(1, 'days')),
          title: 'Some title'
        }
      ]
    };
  }
  componentDidMount() {
    let trainingArr = [];
    const customers = this.props.customers;
    if (customers.length > 0) {
      customers.forEach(customer => {
        customer.trainings.forEach(training => {
          if (training.rel !== null) {
            trainingArr.push({
              start: moment(training.date),
              end: moment(training.date),
              title: `${customer.firstname} ${customer.lastname} - ${
                training.activity
              } - ${training.duration} min(s)`
            });
          }
        });
      });
    }
    this.setState({ event: trainingArr, loading: false }, () => {
      console.log(trainingArr);
    });
  }

  renderContent() {
    const localizer = BigCalendar.momentLocalizer(moment);
    switch (this.state.loading) {
      case false:
        return (
          <div className="container">
            <Navbar />
            <div
              id="calendar"
              className="box-container"
              style={{
                backgroundColor: 'white',
                padding: '2em',
                borderRadius: '4px'
              }}
            >
              <BigCalendar
                localizer={localizer}
                events={this.state.event}
                startAccessor="start"
                endAccessor="end"
                allDay="true"
              />
            </div>
          </div>
        );
      default:
        return <p />;
    }
  }

  render() {
    return this.renderContent();
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
