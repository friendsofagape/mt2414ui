import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HeaderforAdmin extends Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/getlanguages">
              <span className='glyphicon glyphicon-home scolor'></span>&nbsp;&nbsp;
              <strong className="scolor">Autographa MT</strong>
            </Link>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="pull-right">
            <NavItem eventKey={1} componentClass={Link} href="/" to="/admin">
              <strong className="scolor">Upload Source</strong>
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/" to="/getlanguages">
              <strong className="scolor">Available Texts</strong>
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/" to="/downloadtokens">
              <strong className="scolor">Download Tokens</strong>
            </NavItem>
            <NavItem eventKey={4} componentClass={Link} href="/" to="/uploadtokens">
              <strong className="scolor">Upload Tokens</strong>
            </NavItem>
            <NavItem eventKey={5} componentClass={Link} href="/" to="/gettranslationdraft">
              <strong className="scolor">Download Draft</strong>
            </NavItem>
            {/* only for super admin
            <NavItem eventKey={7} componentClass={Link} href="/" to="/translation">
              <strong className="scolor">Translation </strong>
            </NavItem>
            */}
            <NavItem eventKey={6} componentClass={Link} href="/" to="/logout">
              <strong className="scolor">Log out</strong>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderforAdmin;