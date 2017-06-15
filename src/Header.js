import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect fixedTop>
        <Navbar.Header><Navbar.Brand>
            <a href="/signin">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;AutographaMT: Machine Translation Engine</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} ><Link to={'/signin'}>Sign in</Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/getlanguages'}>Get Languages</Link></NavItem>
            <NavItem eventKey={3} ><Link to={'/uploadsource'}>Upload Source </Link></NavItem>
            <NavItem eventKey={6} ><Link to={'/generateconcordance'}>Generate Concordance</Link></NavItem>
            <NavItem eventKey={4} ><Link to={'/downloadtokens'}>Download Tokens & Concordance</Link> </NavItem>
            <NavItem eventKey={7} ><Link to={'/getconcordances'}>Get Concordances</Link> </NavItem>
            <NavItem eventKey={5} ><Link to={'/uploadtokens'}>Upload Tokens</Link> </NavItem>
            <NavItem eventKey={8} ><Link to={'/gettranslationdraft'}>Get Translation</Link> </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;