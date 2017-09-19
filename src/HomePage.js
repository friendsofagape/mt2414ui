import React, {Component} from 'react';
import { Link } from 'react-router';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SigninForm from './SigninForm';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
        <Navbar.Header><Navbar.Brand>
          <a href="/signin"><span className='glyphicon glyphicon-home scolor'></span>&nbsp; <strong className="scolor">Autographa MT</strong></a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="pull-right">
            <NavItem eventKey={1} ><Link to={'/homepage'}><span className="glyphicon glyphicon-user scolor"></span><strong className="scolor">Signin</strong></Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/signup'}><span className="glyphicon glyphicon-user scolor"></span><strong className="scolor">Signup</strong></Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

class HomePage extends Component {  
  render() {
    var Style = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '229px'};
    window.localStorage.clear();
    return (
      <div>
        <Header />
      <div className="container">
        <div className="row ">
          
            <div className="col-md-8 bodyColor divSpace">
              <h3 className="top3 fonth3">Welcome to</h3>
              <h1 className="fonth1">Autographa MT</h1>
              <h4 className="fonth4">MACHINE TRANSLATION ENGINE</h4>
              <div style={Style}>
                <img alt="" src={require('./Images/bible.png')} />
              </div>
            </div>

          <div className="col-md-3 bodyColor divSpace colmd3Width" >
            <SigninForm />
          </div>

        </div>

      </div>
        <div>
          <Footer/>
        </div>
    </div>
    );
  }
}


export default HomePage;