import React from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className='App'>
        <NavLink
          exact
          to='/'
          className='router-link'
          activeClassName='active-link'
        >
          <span>Home</span>
        </NavLink>

        <NavLink
          to='/calendar'
          className='router-link'
          activeClassName='active-link'
        >
          Calendar
        </NavLink>
      </div>
    );
  }
}
