import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

class HeaderforMember extends Component {
  render() {
    return (
        <Navbar inverse>
        <Navbar.Header><Navbar.Brand>
            <a href="/getlanguages"><span className='glyphicon glyphicon-home scolor'></span>&nbsp;&nbsp;<strong className="scolor">Autographa MT</strong></a>
        </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="pull-right">
            <NavItem eventKey={1} ><Link to={'/getlanguages'}>Available Source Texts</Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/downloadtokens'}>Download Tokens</Link> </NavItem>
            <NavItem eventKey={3} ><Link to={'/uploadtokens'}>Upload Tokens</Link> </NavItem>
            <NavItem eventKey={4} ><Link to={'/gettranslationdraft'}>Download Translation Draft</Link> </NavItem>
            <NavItem eventKey={7} ><Link to={'/translation'}><strong className="scolor">Translation </strong></Link></NavItem>
            <NavItem eventKey={5} ><Link to={'/logout'}>Log out</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderforMember;