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
        password: '',
        uploaded:'uploadingStatus',
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
      url: "https://api.mt2414.in/v1/auth",
      data :{
        username : this.state.email,
        password : this.state.password
      },
        method : "POST",
        success: function(result) {

        if (result){
          var auth = result;
          _this.setState({uploaded:'success'})
          window.localStorage.setItem('access_token', auth)
          location.href = "http://localhost:3000/getlanguages"
        }
        },
        error: function(error){
        _this.setState({uploaded:'failure'})
        }
    });
  }

    render() {
      return (
        <div className="container">
        <Header />
        <div className="col-xs-12 col-md-6 col-md-offset-3">
        <form onSubmit={this.onLogin} onClick={this.getLanguages} className="col-md-8 ">
          <h1 className="signin-header">Sign in</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>Sign-in Successfully !!!</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
              <strong>Failed to Sign-in !!!</strong>
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
            <button className="btn btn-success"> Sign in </button>
          </div>
          <div className="signlink">
            <Link to={'/signup'}>Sign up instead</Link>
          </div>
        </form>
        </div>
        <Footer />
        </div>

      );
    }
}
export default SigninForm;