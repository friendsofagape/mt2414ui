/**
 * @module src/SignupForm
 *
 * Component that display SignupForm and SigninForm
 * Accepts the following properties:
 *  - email: enter email for signin
 *  - password: enter the same password which you have enter at the time of signup
 *  - confirmpassword: enter the same password for confirmpassword
 *
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import $ from 'jquery';

class SignupForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
    }
      // Signup form form specific callback handlers
      this.onChange = this.onChange.bind(this);
      this.onRegistration = this.onRegistration.bind(this);
   }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  onRegistration(e) {
    e.preventDefault();
    //Performing a POST request for registrations using AJAX call
    $.ajax({
       url: "https://api.mt2414.in/v1/registrations",
       data :{
           email : this.state.email,
           password : this.state.password
           },
           method : "POST",
         success: function(result) {
             console.log("Successfully Excuted !!");
             console.log(result);
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
        <div className="App">
        <form onSubmit={this.onRegistration} className="col-md-6">
          <h1>Sign up</h1>
              <div className="form-goup">
                <lable className="control-lable"> Email </lable>
                <input
                  value={this.state.value}
                  onChange={this.onChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  required="true"
                />
              </div>
              <div className="form-goup">
                <lable className="control-lable"> Password </lable>
                <input
                  value={this.state.value}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <div className="form-goup">
                <lable className="control-lable"> Confirm Password </lable>
                <input
                  value={this.state.value}
                  onChange={this.onChange}
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  className="form-control"
                />
              </div>
          <div className="form-goup">
            <button className="btn btn-primary" > Sign up </button>
          </div>
          <div className="signlink">
            <Link to={'/signin'}>Already a user? Sign in instead</Link>
          </div>
        </form>
        </div>
      );
    }
 }
export default SignupForm;
