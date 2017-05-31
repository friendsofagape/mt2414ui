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
          <Nav pullLeft>
            <NavItem
              eventKey={1}
              href="/signup">
              Sign up
            </NavItem>
            <NavItem
              eventKey={2}
              href="/signin">
              Sign in
            </NavItem>
            <NavItem
              eventKey={1}
              href="/getlanguages">
              Get Languages
            </NavItem>
            <NavItem
              eventKey={1}
              href="/uploadsource">
              Upload Source
            </NavItem>
            <NavItem
              eventKey={2}
               href="/generatetokens">
               Generate Tokens
            </NavItem>
            <NavItem
              eventKey={2}
               href="/generateconcordance">
               Generate Concordance
            </NavItem>
            <NavItem
              eventKey={2}
               href="/getconcordances">
               Get Concordances
            </NavItem>
            <NavItem
              eventKey={2}
               href="/gettranslationdraft">
               Get Translation Draft
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;
