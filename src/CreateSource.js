/**
 * @module src/CreateSource
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: version of source language
*/

import React, { Component } from 'react';
import './App.css';
import Footer from './Footer';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { FormControl } from 'react-bootstrap';
import SourceLanguages from './SourceLanguages';
import $ from 'jquery';
import GlobalURL from './GlobalURL';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect fixedTop >
        <Navbar.Header><Navbar.Brand>
            <a href="/homepage">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;Autographa MT</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="customHeaderAdmin">
            <NavItem eventKey={1} ><Link to={'/admin'}>Upload Source</Link></NavItem>
            <NavItem eventKey={2} ><Link to={'/createsource'}>Create Source</Link></NavItem>
            <NavItem eventKey={3} ><Link to={'/homepage'}>Log out</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }
}

class CreateSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:'',
      version: '',
      uploaded:'Uploading',
      message: ''
    }

    // Upload file specific callback handlers
    this.createSource = this.createSource.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  createSource(e){
    var _this = this
      var data = { 
        "language": this.state.language, "version": this.state.version
      }
      let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
      $.ajax({
        url: GlobalURL["hostURL"]+"/v1/createsources",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        method : "POST",
        async: false,
        headers: {
                  "Authorization": "bearer " + accessToken
        },
      beforeSend: function () {
          $(".modal").show();
      },
        // eslint-disable-next-line
        success: function (result) {
        result = JSON.parse(result)
          if (result.success !== false) {
          _this.setState({message: result.message, uploaded: 'success'})
        }else {
          _this.setState({message: result.message, uploaded: 'failure'})
          }
      },
      error: function (error) {
        _this.setState({uploaded: 'failure'}) 
      }
      });
    }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">Create Sources</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                    <FormControl value={this.state.language} onChange={this.onSelect} name="language" componentClass="select" placeholder="select">
                      { 
                        Object.keys(SourceLanguages[0]).map(function(v, i) {
                          return(<option  key={i} value={v}>{SourceLanguages[0][v]}</option>)
                        })
                      }
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control" /> 
              </div>&nbsp;
              <div className="form-group">
                <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.createSource} disabled={!this.state.version} ><span className="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Create Source</button>&nbsp;&nbsp;&nbsp;
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default CreateSource;