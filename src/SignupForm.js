import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import axios from 'axios';

class SignupForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: ''
    }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

    onChange(e) {
      this.setState({
         [e.target.name]: e.target.value });
      }

    onSubmit(e) {
        e.preventDefault();
        console.log(e)
        console.log(this.state);
        var self = this;
        //Performing a POST request
        axios.post('https://api.mt2414.in/v1/registrations', {
           email: self.state,
           password: self.state
         })
         .then(function (response) {
           console.log(response);
        })
        .catch(function (error) {
          console.log("Hello")
          console.log('error' + error)
        });
     }

    render() {
      return (
        <div className="App">
        <form onSubmit={this.onSubmit} className="col-md-6">
          <h1>Signup Page</h1>
              <div className="form-goup">
                <lable className="control-lable"> Email </lable>
                <input
                  value={this.state.value}
                  onChange={this.onChange}
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="form-control"
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
