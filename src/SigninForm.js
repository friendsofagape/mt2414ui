import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';
import axios from 'axios';


  class SigninForm extends Component {
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
      this.setState({ [e.target.name]: e.target.value });
      }

    onSubmit(e) {
        e.preventDefault();

        //Performing a GET request

              axios.get('/users')
                .then(function (response) {
                  console.log(response);
              })
              .catch(function (error) {
                console.log(error)
              });


      //Performing a POST request

              axios.post('/https://api.mt2414.in/v1/', {
                 username: this.state,
                 password: this.state
               })
               .then(function (response) {
                 console.log(response);
              })
              .catch(function (error) {
                console.log(error)
              });
        }
    render() {
      return (
        <div className="App">
        <form onSubmit={this.onSubmit} className="col-md-6">
          <h1>Signin Page</h1>
          <div className="form-goup">
            <lable className="control-lable"> Email </lable>
            <input
              value={this.state.email}
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
              value={this.state.password}
              onChange={this.onChange}
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
            />
          </div>
          <div className="form-goup">
            <button className="btn btn-primary">
             Sign in
            </button>
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
