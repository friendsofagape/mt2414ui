import React, { Component } from 'react';
import {Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, PageHeader} from 'react-bootstrap';
import './App.css';


class SignupForm extends Component {
   constructor(props){
     super(props);
     this.Signup = this.Signup.bind(this);
   }

   Signup(event){
     alert("Signup Successfully !!");
   }

  render() {
    return (
      <div className="App">
       <div className="col-md-10">
         <PageHeader><div className="Sign">Signup Page</div></PageHeader>
          <Form horizontal className="App">
           <FormGroup controlId="formHorizontalEmail">
             <Col componentClass={ControlLabel} sm={2} > Name </Col>
               <Col sm={6}>
               <FormControl type="name" placeholder="Name" />
             </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2} > Email </Col>
              <Col sm={6}>
              <FormControl type="email" placeholder="Email" />
            </Col>
         </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>Password </Col>
             <Col sm={6}>
             <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>Confirm Password </Col>
              <Col sm={6}>
              <FormControl type="password" placeholder="Confirm Password" />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={4}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={4}>
            <input type="submit" className="btn btn-primary" name="submit" onSubmit={this.Signup(event)} value="Sign Up" />
            </Col>
          </FormGroup>
           </Form>
           </div>
      </div>
    );
  }
}

export default SignupForm;
