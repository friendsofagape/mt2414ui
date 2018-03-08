import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class HeaderforAdmin extends Component {
  render() {
    return (
        <Navbar inverse fixedTop>
        <Navbar.Header><Navbar.Brand>
            <Link to="/getlanguages">
              <span className='glyphicon glyphicon-home scolor'></span>&nbsp;&nbsp;
              <strong className="scolor">Autographa MT</strong>
            </Link>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="pull-right">
            <NavItem eventKey={1} ><Link to={'/admin'}><strong className="scolor">Upload Source</strong></Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/getlanguages'}><strong className="scolor">Available Texts</strong></Link></NavItem>
            <NavItem eventKey={3} ><Link to={'/downloadtokens'}><strong className="scolor">Download Tokens</strong></Link> </NavItem>
            <NavItem eventKey={4} ><Link to={'/uploadtokens'}><strong className="scolor">Upload Tokens</strong></Link> </NavItem>
            <NavItem eventKey={5} ><Link to={'/gettranslationdraft'}><strong className="scolor">Download Draft</strong></Link> </NavItem>
            <NavItem eventKey={7} ><Link to={'/translation'}><strong className="scolor">Translation </strong></Link></NavItem>
            <NavItem eventKey={6} ><Link to={'/logout'}><strong className="scolor">Log out</strong></Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderforAdmin;