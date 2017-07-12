/**
 * @module src/UploadSource
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: version of source language
 *  - base64_arr: file in the form of base64
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
        <Navbar inverse collapseOnSelect fixedTop >
        <Navbar.Header><Navbar.Brand>
            <a href="/homepage">&nbsp;<span className='glyphicon glyphicon-home'></span>&nbsp;&nbsp;Autographa MT</a>
          </Navbar.Brand><Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
          <Nav className="customHeaderAdmin">
            <NavItem eventKey={1} ><Link to={'/admin'}>Upload Source</Link></NavItem>
            <NavItem eventKey={1} ><Link to={'/homepage'}>Log out</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

class UploadSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:'tam',
      version: '',
      base64_arr: [],
      uploaded:'Uploading',
      message: ''
    }

      // Upload file specific callback handlers
      this.uploadFile = this.uploadFile.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.file_base64 = this.file_base64.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  file_base64(e){
    var files = document.getElementById('file-input').files
    var file = [];
    global.base64_arr = [];
    if(files.length > 0){
        for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(files[i] );
        reader.onload = (function (file) {
          return function (e) {
            var data = this.result;
            var unwantedData = "data:;base64,";
            data = data.replace(unwantedData, "");
            global.base64_arr.push(data);
          }
        })(file);
        reader.onerror = function (error) {
        };
      }
    }
    
  }

  uploadFile(e){
    e.preventDefault();
    var ext = $('#file-input').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['usfm']) === -1) {
      this.setState({uploaded: 'success'})
    } else {
      this.setState({uploaded: 'failure'}) 
    } 

    var _this = this
    for(var i = 0; i < (global.base64_arr).length; i++){
      var data = { 
        "language": this.state.language, "version": this.state.version, "content": [global.base64_arr[i]]
      }
      let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
      var countSuccess = 0;
      var countFailure = 0;

      $.ajax({
        url: GlobalURL["hostURL"]+"/v1/sources",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        method : "POST",
        headers: {
                  "Authorization": "bearer " + accessToken
        },
        // eslint-disable-next-line
        success: function (result) {
        result = JSON.parse(result)
        if (result.success !== false) {
            countSuccess++;
          _this.setState({message: "Uploading ...... file no." + countSuccess, uploaded: 'success'})
          if((countSuccess + countFailure) === (global.base64_arr).length){  
            _this.setState({message: "Uploaded " + countSuccess + " files successfully", uploaded: 'success'})
          }        
        }else {
          countFailure++;
          _this.setState({message: result.message, uploaded: 'failure'})
          if((countSuccess + countFailure) === (global.base64_arr).length){   
             _this.setState({message: "Uploaded " + countSuccess + " files successfully", uploaded: 'success'})
          } 
        }
        }
      });
     } 
    }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">Upload Sources</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
                <strong>No Changes. Existing source is already up-to-date</strong>
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
                <div className="form-control">
                  <input id="file-input" type="file" className="fileInput" onChange={this.file_base64} multiple />
                </div>&nbsp;
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.uploadFile}><span className="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Upload Source</button>&nbsp;&nbsp;&nbsp;
                  </div>
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default UploadSource;