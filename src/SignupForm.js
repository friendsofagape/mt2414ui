/**
 * @module src/SignupForm
 *
 * Component that display SignupForm  with validation of each field 
 * Accepts the following properties:
 *  - email: enter email for signin
 *  - password: enter the same password which you have enter at the time of signup
 *  - passwordConfirm: enter the same password for confirmpassword
 *
 */
 
import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import { Link } from 'react-router';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import GlobalURL from './GlobalURL';

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
            <NavItem eventKey={1} ><Link to={'/signup'}><span className="glyphicon glyphicon-user scolor"></span><strong className="scolor">Signup</strong></Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/homepage'}><span className="glyphicon glyphicon-user scolor"></span><strong className="scolor">Signin</strong></Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

class SignupForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        passwordConfirm: '',
        uploaded:'uploadingStatus'
    }
      // Signup form form specific callback handlers
      this.onChange = this.onChange.bind(this);
      this.onRegistration = this.onRegistration.bind(this);
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
    const isPassword = refName.indexOf('password') !== -1;
    const isPasswordConfirm = refName === 'passwordConfirm';
      
      if (isPasswordConfirm) {
        if (this.refs.password.value !== this.refs.passwordConfirm.value) {
          this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
        } else {
          this.refs.passwordConfirm.setCustomValidity('');
        }
      }
          
      if (!validity.valid) {
        if (validity.valueMissing) {
          error.textContent = `${label} is a required field`; 
        } else if (validity.typeMismatch) {
          error.textContent = `${label} should be a valid email address`; 
        } else if (isPassword && validity.patternMismatch) {
          error.textContent = `${label} should be longer than 4 chars`; 
        } else if (isPasswordConfirm && validity.customError) {
          error.textContent = 'Passwords do not match';
        }
        return false;
      }
      
      error.textContent = '';
      return true;
  }

  onRegistration(e) {
    e.preventDefault();
    var _this = this;
    //Performing a POST request for registrations using AJAX call
    $.ajax({
       url: GlobalURL["hostURL"]+"/v1/registrations",
       data: {
          email : this.state.email,
          password : this.state.password
          },
           method : "POST",
         success: function(result) {

             result = JSON.parse(result)
             if(result.success !== false){
            _this.setState({uploaded: result.success ? 'success' : ''})
            _this.setState({message: result.message})
            setTimeout(function(){
              _this.setState({uploaded: 'fail'})
            },5000);
            window.location.href = "./homepage";
             }else {
               _this.setState({message: result.message, uploaded: 'failure'})
                setTimeout(function(){
                  _this.setState({uploaded: 'fail'})
                },5000);
             }
          },
          error: function (error) {
           _this.setState({message: error.message, uploaded: 'failure'})
            setTimeout(function(){
              _this.setState({uploaded: 'fail'})
            },5000);
          }
     });
  }

  render() {
      return (
        <div>
        <Header/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Sign up</h3>
            </div>
          </div>

        <div className="row"> 
          <div className="col-md-12 col-md-4 col-md-offset-4 bodyColor bodyBorder">
            <form encType="multipart/form-data" onSubmit={this.onRegistration}>
                <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success dismissable' : 'invisible')}>
                  <a className="close" data-dismiss="alert" aria-label="close">×</a>                               
                  <strong>{this.state.message}</strong>
                </div>
                <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger dismissable': 'invisible')}>
                  <a className="close" data-dismiss="alert" aria-label="close">×</a>                                             
                  <strong>{this.state.message}</strong>
                </div>
                <div className="form-group">
                  <lable className="control-label" id="emailLabel"> <strong> Email </strong> </lable>
                  <input className="form-control" value={this.state.email} onChange={this.onChange} type="email"  name="email" placeholder="Email" ref="email" required />
                  <div className="error" id="emailError" />
                </div>
                <div className="form-group">
                  <lable className="control-label" id="passwordLabel"> <strong> Password </strong> </lable>
                  <input className="form-control" value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder="Password" ref="password" pattern=".{5,}" required />
                  <div className="error" id="passwordError" />
                </div>
                <div className="form-group">
                  <lable className="control-label" id="passwordConfirmLabel"> <strong> Confirm Password </strong> </lable>
                  <input className="form-control" value={this.state.passwordConfirm} onChange={this.onChange} type="password" name="passwordConfirm" placeholder="Confirm Password" ref="passwordConfirm" required />
                  <div className="error" id="passwordConfirmError" />
                </div>
                <div className="form-group top5">
                  <button className="btn btn-success btn-block" > Sign up </button>
                </div>
            </form>
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
export default SignupForm;
