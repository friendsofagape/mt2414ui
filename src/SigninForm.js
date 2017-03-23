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
      this.setState({ [e.target.name]: e.target.value });
      }

    onLogin(e) {
        e.preventDefault();
        //Performing a POST request for authentcation
        $.ajax({
             url: "https://api.mt2414.in/v1/auth",
             data :{
             username : this.state.email,
             password : this.state.password
             },
             method : "POST",
             success: function(result) {
               console.log("Successfully Excuted !!! ");
                 console.log(result);
             },
             error: function(error){
                 console.log(error);
             },
             complete(complete){
             console.log("Successfully Completed !!");
             }
         });
        }

    render() {
      return (
        <div className="App">
        <form onSubmit={this.onLogin} className="col-md-6">
          <h1>Sign in</h1>
          <div className="form-goup"><br/>
            <lable className="control-lable"> Email</lable>
            <input
              value={this.state.email}
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
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
            />
          </div>
          <div className="form-goup">
            <button className="btn btn-primary"> Sign in </button>
          </div>
          <div className="signlink">
            <Link to={'/signup'}>Sign up instead</Link>
          </div>
        </form>
        </div>
      );
    }
}
export default SigninForm;
