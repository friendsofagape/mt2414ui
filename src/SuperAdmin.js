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
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import Header from './Header';

class SuperAdmin extends Component {
  constructor(props){
    super(props);
    this.state = {
      getAllEmails: '',
      message: '',
      uploaded:'',
      getAllRoles: ''
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
          Object.keys(getEmail).map(function(key, value){
            return _this.setState({getAllEmails: key.length > 0 ? key: [], getAllRoles: getEmail[key].length > 0 ? getEmail[key]: []});

          })
          
        },
        error: function (error) {
        }
      });
  }
  
  //for Approve as Admin
  approveAdmin(obj){
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
          _this.setState({message: result.message, uploaded: 'success'})
          setTimeout(function(){
            location.reload();
          },2000);
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
          _this.setState({message: result.message, uploaded: 'success'})
          setTimeout(function(){
            location.reload();
          },2000);
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
    var currentRoles = [];
    currentRoles[currentEmail] = this.state.getAllRoles.length > 0 ?  this.state.getAllRoles : [];

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
          <form className="col-md-8 uploader getEmailCustom" encType="multipart/form-data">
            <div className="container">
              <table className="table emailTable">
                <thead>
                  <tr>
                    <th>List of registered e-mails</th>
                    <th>User Role</th>
                    <th>Assign Role</th>

                  </tr>
                </thead>
                <tbody>
                  {Object.keys(currentRoles).map(function(data, index){
                    return (
                      <tr key={index}>
                        <td>
                          <li key={index}><i className="fa fa-envelope fa-fw"></i>{data}</li>
                        </td>
                        <td>
                          <p>{currentRoles[data]}</p>
                        </td>
                        <td>
                        {
                          (currentRoles[data] === 'admin')?(
                          <a href="#" data-email={data} onClick={_this.setMember.bind(this,{"email": data, "admin": "False"})} className="customLink">Set as Member</a>
                          ):(
                          <a href="#" data-email={data} onClick={_this.approveAdmin.bind(this,{"email": data, "admin": "True"})} className="customLink">Approve as Admin</a>)
                        } 
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
