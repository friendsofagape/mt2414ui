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
import { Link } from 'react-router-dom';
import './App.css';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
var jwtDecode = require('jwt-decode');

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
      },
      error: function (error) {
       _this.setState({message: "Service Temporarily Unavailable", uploaded: 'failure'})
        setTimeout(function(){
          _this.setState({uploaded: 'fail'})
        },5000);
      }
    });
  }

  render() {
    return (
      <div className="top3"> 
        <form onSubmit={this.onLogin} onClick={this.getLanguages}>
          <div className={"alert " + (this.state.uploaded === 'success' ? 'alert-success' : 'invisible')}>
            <strong>{this.state.message}</strong>
          </div>
          <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
            <strong>{this.state.message}</strong>
          </div>
          <h3><span className="glyphicon glyphicon-user"></span>&nbsp;Login</h3>
          <div className="form-group"><br/>
            <label className="control-label" id="emailLabel"> <strong> Email </strong> </label>
            <input className="form-control"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              placeholder="Email"
              ref="email"
              autoComplete="off"
              required />
            <div className="error" id="emailError" />
          </div>
          <div className="form-group">
            <label className="control-label" id="passwordLabel"> <strong> Password </strong> </label>
            <input className="form-control"
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              placeholder="password"
              pattern=".{5,}"
              ref="password"
              autoComplete="off"
              required />
            <div className="error" id="passwordError" />
          <Link to={'/resetpassword'}>forgot password ?</Link>
          </div>
          <div className="form-group center-block top1">
            <button className="btn btn-success btn-block"> {<span className='glyphicon glyphicon-user'></span>}&nbsp; Sign in </button>
          </div>
          <div className="alignCenter">
          ----------- Create a new account? ------------
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <div>
            <div className="form-group center-block">
              <Link to={'/signup'} type="button" className="btn btn-success btn-block" >Create your new account</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SigninForm;