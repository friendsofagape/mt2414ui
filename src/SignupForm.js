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
import { Link } from 'react-router';
import './App.css';
import $ from 'jquery';
import Header from './Header';
import Footer from './Footer';

class SignupForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        passwordConfirm: ''
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

    //Performing a POST request for registrations using AJAX call
    $.ajax({
       url: "https://api.mt2414.in/v1/registrations",
       data: {
          email : this.state.email,
          password : this.state.password
          },
           method : "POST",
         success: function(result) {
            console.log("Successfully Excuted !!");
            window.location.href = "./signin";
           },
         error: function(error){
             console.log(error);
          },
         complete(complete){
           console.log("Successfully completed !!");
         }
     });
  }

  render() {
      return (
        <div className="container">
        <Header />
        <div className="col-xs-12 col-md-6 col-md-offset-3">
        <form onSubmit={this.onRegistration} className="col-md-8">
          <h1 className="signup-header">Sign up</h1>&nbsp;
              <div className="form-group">
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
                  placeholder="Password"
                  ref="password"
                  pattern=".{5,}"
                  required />
                <div className="error" id="passwordError" />
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-label" id="passwordConfirmLabel"> <strong> Confirm Password </strong> </lable>
                <input className="form-control" 
                  value={this.state.passwordConfirm}
                  onChange={this.onChange}
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  ref="passwordConfirm"
                  required />
                <div className="error" id="passwordConfirmError" />
              </div>&nbsp;
          <div className="form-group">
            <button className="btn btn-success" > Sign up </button>
          </div>
          <div className="signlink">
            <Link to={'/signin'}>Already a user? Sign in instead</Link>
          </div>
        </form>
        </div>
         <Footer />
        </div>
      );
    }
 }
export default SignupForm;
