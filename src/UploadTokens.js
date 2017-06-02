/**
 * @module src/UploadTokens
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - content: Content of all the source documents stored
 *  - Access ID & Key: Returned as a response after authentication
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import Language from './SourceLanguages';
import TargetLanguages from './TargetLanguages';
import $ from 'jquery';

class UploadTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language:'tam',
      version: '',
      revision: '',
      targetlang: 'tam',
      tokenwords: {},
      uploaded:'Uploading',
      message: ''
    }

      // Upload file specific callback handlers
      this.uploadTokens = this.uploadTokens.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.file_xls = this.file_xls.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  file_xls(e, files){
    var _this = this;
    var file = files[0];
    var allRows = [];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          // console.log(evt.target.result.split("\n"));
         allRows = evt.target.result.split(/\r?\n|\r/);

      }
      reader.onerror = function (evt) {
          console.log("error reading file");
          allRows = []
      }
    }
    return allRows;
  }

  uploadTokens(e){
    var _this = this;
    let file = document.getElementById('file-input').files[0];
    var allRows = [];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          // console.log(evt.target.result.split("\n"));
         allRows = evt.target.result.split(/\r?\n|\r/);
        for(var singleRow = 0; singleRow < allRows.length; singleRow++) {
          let token = allRows[singleRow].split(",");
          _this.state.tokenwords[token[0]] = token[1];
        }
        
      }
      reader.onerror = function (evt) {
          console.log("error reading file");
          allRows = []
      }
    }
    e.preventDefault();

    var data = { 
            "language": this.state.language, "version": this.state.version, "revision": this.state.revision, "targetlang": this.state.targetlang, "tokenwords": this.state.tokenwords
          }
 
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

    $.ajax({
      url: "http://127.0.0.1:8000/v1/uploadtokentranslation",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      success: function (result) {
         result = JSON.parse(result)
         console.log(result)
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
            <h1 className="source-header">Upload Tokens</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
                <strong>Failed to Upload Tokens !!!</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Source Language </strong> </lable>
                    <FormControl value={this.state.language} onChange={this.onSelect} name="language" componentClass="select" placeholder="select">
                      {Language.map((language, i) => <option  key={i} value={language.code}>{language.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control" /> 
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Revision </strong> </lable>
                    <input value={this.state.revision} onChange={this.onSelect} name="revision" type="text" placeholder="revision" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-label"> <strong> Target Language </strong> </lable>
                    <FormControl value={this.state.targetlang} onChange={this.onSelect} name="targetlang" componentClass="select" placeholder="select">
                      {TargetLanguages.map((targetlang, i) => <option  key={i} value={targetlang.code}>{targetlang.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <div className="form-control">
                  <input id="file-input" type="file" className="fileInput" multiple />
                </div>&nbsp;
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.uploadTokens}>Upload Tokens</button>&nbsp;&nbsp;&nbsp;
                  </div>
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default UploadTokens;
