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
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import SourceLanguages from './SourceLanguages';
import $ from 'jquery';

class UploadSource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language:'',
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
    var files = document.getElementById('file-input').files;
    var file = files[0]
    global.base64_arr = [];
    if(files.length > 0){
      for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (function (file) {
          return function (e) {
            var data = this.result;
            var unwantedData = "data:;base64,";
            data = data.replace(unwantedData, "");
            global.base64_arr.push(data);
          }
        })(file);
        reader.onerror = function (error) {
         console.log('Error: ', error);
        };
      }
    }
    
  }

  uploadFile(e){

    e.preventDefault();
    var ext = $('#file-input').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['usfm']) === -1) {
      // alert("File is not valid");
      this.setState({uploaded: 'success'})
    } else {
      // alert("File is valid");
      this.setState({uploaded: 'failure'}) 
    } 

    var _this = this
    console.log(this.state.version)
    var data = { 
            "language": this.state.language, "version": this.state.version, "content": global.base64_arr
          }

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

    $.ajax({
      url: "https://api.mt2414.in/v1/sources",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      success: function (result) {
        result = JSON.parse(result)
        _this.setState({uploaded: result.success ? 'success' : ''})
        _this.setState({message: result.message})

      },
      error: function (error) {
         console.log(error);
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
            <h1 className="source-header">Upload Sources</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
                <strong>Failed to Upload Sources !!!</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                    <FormControl value={this.state.language} onChange={this.onSelect} name="language" componentClass="select" placeholder="select">
                      {SourceLanguages.map((language, i) => <option  key={i} value={language.code}>{language.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Ethnologue Code </strong> </lable>
                      <input value={this.state.language} onChange={this.onSelect} type="text" name="EthnologueCode" placeholder="tam" className="form-control"/>
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
                  <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.uploadFile}>Upload Source</button>&nbsp;&nbsp;&nbsp;
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
