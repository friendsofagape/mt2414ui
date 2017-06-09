import React, { Component } from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


class Header extends Component {
    constructor(props) {
    super(props);

    this.state = {
      activeKey:''
    };

      // Upload file specific callback handlers
      this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    this.setState({
      activeKey: selectedKey
    });
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header><Navbar.Brand>MT2414: Machine Translation Engine</Navbar.Brand><Navbar.Toggle/></Navbar.Header>
        <Navbar.Collapse>
          <Nav  bsStyle="pills" stacked   activeKey={this.state.activeKey} onSelect={this.handleSelect}>
            <NavItem eventKey={1} ><Link to={'/signin'}>Sign in</Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/getlanguages'}>Get Languages</Link></NavItem>
            <NavItem eventKey={3} ><Link to={'/uploadsource'}>Upload Source </Link></NavItem>
            <NavItem eventKey={4} ><Link to={'/generatetokens'}>Generate Tokens</Link> </NavItem>
            <NavItem eventKey={5} ><Link to={'/uploadtokens'}>Upload Tokens</Link> </NavItem>
            <NavItem eventKey={6} ><Link to={'/generateconcordance'}>Generate Concordance</Link></NavItem>
            <NavItem eventKey={7} ><Link to={'/getconcordances'}>Get Concordances</Link> </NavItem>
            <NavItem eventKey={8} ><Link to={'/gettranslationdraft'}>Get Translation Draft</Link> </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


export default Header;