/**
 * @module src/SigninForm
 *
 * Component that display SigninForm
 * Accepts the following properties:
 *  - email: enter email for signin
 *  - password: enter the same password which you have enter at the time of signup
 *
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import $ from 'jquery';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import GlobalURL from './GlobalURL';
var jwtDecode = require('jwt-decode');

  class Header extends Component {
    render() {
      return (
        <div>
          <Navbar inverse collapseOnSelect fixedTop >
          <Navbar.Header><Navbar.Brand>
            <a href="/homepage">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;AutographaMT: Machine Translation Engine</a>
            </Navbar.Brand><Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse >
            <Nav className="customHeader">
              <NavItem eventKey={1} ><Link to={'/homepage'}><span className="glyphicon glyphicon-user"></span>Signin</Link></NavItem>
              <NavItem eventKey={2} ><Link to={'/signup'}>Signup</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      );
    }
  }

  class SigninForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        uploaded:'Uploading',
        message: ''
      }
      // Signin form form specific callback handlers
      this.onChange = this.onChange.bind(this);
      this.onLogin = this.onLogin.bind(this);
    }

    onChange(e) {
      e.target.classList.add('active');
      this.setState({ [e.target.name]: e.target.value });
      this.showInputError(e.target.name);
    }

  // Checking signup form error
  showFormErrors() {
    const inputs = document.querySelectorAll('input');
    let isFormValid = true;
    
    inputs.forEach(input => {
      input.classList.add('active');
      
      const isInputValid = this.showInputError(input.name);
      
      if (!isInputValid) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  }

//Showing input error for each field 
  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isPassword = refName.indexOf('password') !== -1;
          
      if (!validity.valid) {
        if (validity.valueMissing) {
          error.textContent = `${label} is a required field`; 
        } else if (validity.typeMismatch) {
          error.textContent = `${label} should be a valid email address`; 
        } else if (isPassword && validity.patternMismatch) {
          error.textContent = `${label} should be longer than 4 chars`; 
        }
        return false;
      }
      
      error.textContent = '';
      return true;
  }

  onLogin(e) {
    e.preventDefault();
    //Performing a POST request for authentcation
    var _this = this
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/auth",
      data :{
        email : this.state.email,
        password : this.state.password
      },
      method : "POST",
      success: function(result){
         result = JSON.parse(result)
         if (result.success !== false) {
          window.localStorage.setItem('access_token', JSON.stringify(result.access_token))
          let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
          var decoded = jwtDecode(accessToken);
          if (!accessToken) {
            window.location.href = "./homepage";
          } else {
                if(!decoded.role){
                   window.location.href = "./homepage";
                }else if (decoded.role === "superadmin") {
                   window.location.href = "./superadmin";
                }else if (decoded.role === "admin"){
                  window.location.href = "./admin";
                }else{
                  window.location.href = "./getlanguages";
                }
              }
            }
        else {
          _this.setState({message: result.message, uploaded: 'failure'})
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          },5000);
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
      <Header />
      <div className="col-xs-12 col-md-6 col-md-offset-3">
      <form onSubmit={this.onLogin} onClick={this.getLanguages} className="col-md-8 signinCustom">
        <h1 className="signin-header"><span className="glyphicon glyphicon-user"></span>Login</h1>&nbsp;
          <div className={"alert " + (this.state.uploaded === 'success' ? 'alert-success' : 'invisible')}>
            <strong>{this.state.message}</strong>
          </div>
          <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
            <strong>{this.state.message}</strong>
          </div>
          <div className="form-group"><br/>
          <lable className="control-label" id="emailLabel"> <strong> Email </strong> </lable>
          <input className="form-control"
            value={this.state.email}
            onChange={this.onChange}
            type="email"
            name="email"
            placeholder="Email"
            ref="email"
            required />
          <div className="error" id="emailError" />
        </div>&nbsp;
        <div className="form-group">
          <lable className="control-label" id="passwordLabel"> <strong> Password </strong> </lable>
          <input className="form-control"
            value={this.state.password}
            onChange={this.onChange}
            type="password"
            name="password"
            placeholder="password"
            pattern=".{5,}"
            ref="password"
            required />
          <div className="error" id="passwordError" />
        </div>&nbsp;
        <div className="form-group">
          <button className="btn btn-success"> {<span className='glyphicon glyphicon-user'></span>}&nbsp; Sign in </button>
          <Link to={'/resetpassword'} className="customLink2">I forgot my password ?</Link>
        </div>
        <div className="signlink">
          Create a new account ? &nbsp; &nbsp;<Link to={'/signup'} className="customLink">Click here !!</Link>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </form>
      </div>
      <Footer />
      </div>
    );
  }
}

export default SigninForm;