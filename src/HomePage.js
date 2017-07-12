import React, {Component} from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SigninForm from './SigninForm';

class Header extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect fixedTop >
        <Navbar.Header><Navbar.Brand>
            <a href="/signin">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;AutographaMT: Machine Translation Engine</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="customHeader">
            <NavItem eventKey={1} ><Link to={'/homepage'}><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Signin</Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/signup'}>Signup</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class HomePage extends Component {
  render() {
      window.localStorage.clear(); 
    return (
        <div>
        <Header />
        <div className="container">
          <div className="row customRow">
            <div className="col-sm-8 jumbotron">
            <h3>&nbsp;&nbsp;&nbsp; Welcome to Autographa MT: Machine Translation Engine </h3>
            <img alt=""  style={{width: '102%', height: '380px'}} src={require('./Images/Bible.jpg')} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          <SigninForm />
          </div>
        </div>
        <Footer />
        </div>
    );
  }
}


export default HomePage;