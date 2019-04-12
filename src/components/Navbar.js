import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavDrawer from './NavDrawer';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  render() {
    return (
      <div className="App">
        <AppBar position="static" style={{ backgroundColor: '#FFFFFF' }}>
          <Toolbar>
            <IconButton
              color="black"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <NavLink
              exact
              to="/"
              className="router-link"
              activeClassName="active-link"
            >
              Home
            </NavLink>
            <NavLink
              to="/calendar"
              className="router-link"
              activeClassName="active-link"
            >
              Calendar
            </NavLink>
          </Toolbar>
        </AppBar>

        <NavDrawer
          drawerOpened={this.state.drawerOpened}
          toggleDrawer={this.toggleDrawer}
        />
      </div>
    );
  }
}
