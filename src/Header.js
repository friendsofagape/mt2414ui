import React, { Component } from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">
              MT2414UI
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem
              eventKey={1}
              href="/signin">
              Sign in
            </NavItem>
            <NavItem
              eventKey={2}
              href="/signup">
              Sign up
            </NavItem>
            <NavItem
              eventKey={1}
              href="/sourcedocument">
              Source Document
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;
