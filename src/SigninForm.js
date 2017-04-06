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
import Header from './Header';
import Footer from './Footer';


  class SigninForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
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
    $("#success-alert").show();
    setTimeout(function() { $("#success-alert").slideUp(); }, 500);

    console.log(this.state.password);
    $.ajax({
      url: "https://api.mt2414.in/v1/auth",
      data :{
        username : this.state.email,
        password : this.state.password
      },
        method : "POST",
        success: function(result) {
        if (result){
          var auth = result;
          $("#auth_token").val(auth);
        }
        },
        error: function(error){
        console.log(error);
        }
    });
  }

    render() {
      return (
        <div className="App text-center">
        <Header />
        <form onSubmit={this.onLogin} className="col-md-8 ">
          <div className="form-goup">
            <div className="alert alert-success alert-dismissable"  id="success-alert">
              <a href="#" className="close" data-dismiss="alert" aria-label="close">×</a>
              <strong>Sign up Successfully !</strong>
            </div>
          </div>
          <h1>Sign in</h1>
            <div className="form-goup"><br/>
            <lable className="control-lable " id="emailLabel">Email</lable>
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
          <div className="form-goup">
            <lable className="control-lable" id="passwordLabel"> Password </lable>
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
          <div className="form-goup">
            <button className="btn btn-primary btn-block signup-button"> Sign in </button>
          </div>
          <div className="signlink">
            <Link to={'/signup'}>Sign up instead</Link>
          </div>
          <hr/>
          <div className="form-goup">
          <lable className="control-lable"> Auth Token </lable>
          <input
            value=""
            type="text"
            id="auth_token"
            name="auth token"
            placeholder="Token"
            className="form-control"
          />
        </div>
        </form>
        <Footer />
        </div>

      );
    }
}
export default SigninForm;
