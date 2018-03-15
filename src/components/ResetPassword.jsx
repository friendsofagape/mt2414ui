/**
 * @module src/ResetPassword
 *
 * Component that display SignupForm  with validation of each field 
 * Accepts the following properties:
 *  - email: enter email for signin
 *  - password: enter the same password which you have enter at the time of signup
 *  - passwordConfirm: enter the same password for confirmpassword
 *
 */
 
import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import GlobalURL from './GlobalURL';

class Header extends Component {
  render() {
    return (
        <Navbar inverse>
        <Navbar.Header><Navbar.Brand>
          <Link to="/">
            <span className='glyphicon glyphicon-home scolor'></span>&nbsp;
            <strong className="scolor">Autographa MT</strong>
          </Link>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="pull-right">
            <NavItem eventKey={2} ><Link to={'/signup'}><span className="glyphicon glyphicon-user scolor"></span><strong className="scolor">Signup</strong></Link></NavItem>
            <NavItem eventKey={1} ><Link to={'/'}><span className="glyphicon glyphicon-user scolor"></span><strong className="scolor">Signin</strong></Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class ResetPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        uploaded:'uploadingStatus' 
      }
      // Signup form form specific callback handlers
      this.onChange = this.onChange.bind(this);
      this.onResetPassword = this.onResetPassword.bind(this);
   }

  onChange(e) {
    e.target.classList.add('active');

    this.setState({
      [e.target.name]: e.target.value });

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
      
      if (!validity.valid) {
        if (validity.valueMissing) {
          error.textContent = `${label} is a required field`; 
        } else if (validity.typeMismatch) {
          error.textContent = `${label} should be a valid email address`; 
        }
        return false;
      }
      
      error.textContent = '';
      return true;
  }

  onResetPassword(e) {
    e.preventDefault();
    var _this = this;
    //Performing a POST request for Forgot Password using AJAX call
    $.ajax({
       url: GlobalURL["hostURL"]+"/v1/resetpassword",
       data: {
          email : this.state.email
          },
           method : "POST",
        success: function(result) {
          result = JSON.parse(result)
          if (result.success !== false) {
          _this.setState({message: result.message, uploaded: 'success'})
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          },5000);
          } else {
            _this.setState({message: result.message, uploaded: 'failure'})
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          },5000);
          }
        },
        error: function (error) {
         _this.setState({message: error.message, uploaded: 'failure'})
        }
     });
  }

  render() {
      return (
        <div >
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3><span className="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;Reset Password ?</h3>
                <p className="alignCenter">Enter your registered email Id, we'll send you a password reset email</p>
              </div>
            </div>
            <div className="col-md-12 col-md-4 col-md-offset-4 bodyColor bodyBorder">
              <form onSubmit={this.onResetPassword}>
                <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
                   <strong>{this.state.message}</strong>
                </div>
                <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible')}>
                  <strong>{this.state.message}</strong>
                </div>
                <div className="form-group">
                  <label className="control-label" id="emailLabel"> <strong> Email </strong> </label>
                  <input className="form-control" value={this.state.email} onChange={this.onChange} type="email" name="email"  placeholder="Email" ref="email" required />
                  <div className="error" id="emailError" />
                </div>
                <div className="form-group">
                  <button className="btn btn-success btn-block" > Reset Password </button>
                </div>
              </form>
            </div>
          </div>
        <div>
          <Footer />
        </div>
        </div>
      );
    }
 }

export default ResetPassword;