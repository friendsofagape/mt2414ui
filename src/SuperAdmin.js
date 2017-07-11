/**
 * @module src/SupperAdmin
 *
 * Component that display List of registered e-mails
 * Accepts the following properties:
 * - Email : registered e-mails 
 * - admin : boolean value if True then admin, if False then Member 
 * Also in Header accepts authenticaton token 
*/

import React, { Component } from 'react';
import './App.css';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import $ from 'jquery';
import GlobalURL from './GlobalURL';

class Header extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect fixedTop >
        <Navbar.Header><Navbar.Brand>
            <a href="/homepage">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;Autographa MT</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="customHeaderSuperAdmin">
            <NavItem eventKey={1} ><Link to={'/homepage'}>Log out</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class SuperAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      getAllEmails: '',
      message: '',
      uploaded:'',
    }
    this.approveAdmin = this.approveAdmin.bind(this);
    this.setMember = this.setMember.bind(this);
  }
  
  componentWillMount = () => {
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
      $.ajax({
        url: GlobalURL["hostURL"]+"/v1/emailslist",
        method : "GET",
        headers: {
          "Authorization": "bearer " + accessToken
        },
        success: function (result) {
          var getEmail = JSON.parse(result);
          _this.setState({getAllEmails: getEmail.length > 0 ? getEmail: []})
        },
        error: function (error) {
          console.log(error)
        }
      });
  }
  
  //for Approve as Admin
  approveAdmin(obj){
    console.log(obj)
    var _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/superadminapproval",
      data : JSON.stringify(obj),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
    },
    success: function (result) {
        result = JSON.parse(result)
        if (result.success !== false){
          console.log(result.message)
          _this.setState({message: result.message, uploaded: 'success'})
        }
        else {
          _this.setState({message: result.message, uploaded: 'failure'})
        }
    },
    error: function (error) {
      _this.setState({message: error.message, uploaded: 'failure'})
    }
    });  

  }

  //for set Member
  setMember(obj){
    console.log(obj)
    var _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/superadminapproval",
      data : JSON.stringify(obj),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
    },
    success: function (result) {
        result = JSON.parse(result)
        if (result.success !== false){
          console.log(result.message)
          _this.setState({message: result.message, uploaded: 'success'})
        }
        else {
          _this.setState({message: result.message, uploaded: 'failure'})
        }
    },
    error: function (error) {
      _this.setState({message: error.message, uploaded: 'failure'})
    }
    });  

  }

  render() {
    let currentEmail = this.state.getAllEmails.length > 0 ?  this.state.getAllEmails : [];
    var _this = this;
    return(
      <div className="container">
        <Header/ >
          <h1 className="source-header-email"></h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg2' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg2': 'invisible') }>
              <strong>{this.state.message}</strong>
            </div>
          <form className="col-md-6 uploader getEmailCustom" encType="multipart/form-data">
            <div className="container">
              <table className="table emailTable">
                <thead>
                  <tr>
                    <th>List of registered e-mails</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmail.map(function(data, index){
                    return (
                      <tr key={index}>
                        <td>
                          <li key={index}>{data}</li>
                        </td>
                        <td>
                          <a href="#" data-email={data} onClick={_this.approveAdmin.bind(this,{"email": data, "admin": "True"})} className="customLink">Approve as Admin</a>
                        </td>
                        <td>
                          <a href="#" data-email={data} onClick={_this.setMember.bind(this,{"email": data, "admin": "False"})} className="customLink">Set as Member</a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </form>
        <Footer/>
      </div>
      );
    }
}

export default SuperAdmin;
