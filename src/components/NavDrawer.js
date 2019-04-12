import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

export default class NavDrawer extends Component {
  render() {
    return (
      <Drawer
        anchor="left"
        open={this.props.drawerOpened}
        onClose={this.props.toggleDrawer(false)}
      >
        <div
          onClick={this.props.toggleDrawer(false)}
          onKeyDown={this.props.toggleDrawer(false)}
        >
          <ul>
            <li>Button1</li>
            <li>Button2</li>
            <li>Button3</li>
          </ul>
        </div>
      </Drawer>
    );
  }
}
