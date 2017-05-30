/**
 * @module src/GetTranslationDraft
 *
 * Component that display GetTranslationDraft
 * Accepts the following properties:
 *  - source language: Which language you want to convert from 
 *  - version : version of source language
 *  - target language: In which tokens have been translated too
 *  - token words: token words showul be entered in the form of xls
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import SourceLanguages from './SourceLanguages';
import TargetLanguages from './TargetLanguages';
import $ from 'jquery';

class GetTranslationDraft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sourcelang:'',
      targetlang:'',
      version: '',
      base64_arr: [],
      uploaded:'Uploading'
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
    var data = { 
            "sourcelang": this.state.sourcelang, "version": this.state.version, "targetlang": this.state.targetlang, "tokenwords":{"and":"DNAforeaxmple"}
          }

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

    $.ajax({
      url: "http://127.0.0.1:8000/v1/translations",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      success: function (result) {
        _this.setState({uploaded: 'success'})
        console.log(result)
      },
      error: function (error) {
        console.log("Sources Uploaded failure !!!")
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
            <h1 className="source-header">Translation Draft</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>Sources Uploaded Successfully !!!</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible')}>
                <strong>Failed to Upload Sources !!!</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Source Language </strong> </lable>
                    <FormControl value={this.state.sourcelang} onChange={this.onSelect} name="sourcelang" componentClass="select" placeholder="select">
                      {SourceLanguages.map((sourcelang, i) => <option  key={i} value={sourcelang.code}>{sourcelang.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Ethnologue Code </strong> </lable>
                      <input value={this.state.sourcelang} onChange={this.onSelect} type="text" name="EthnologueCode" placeholder="tam" className="form-control"/>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control" /> 
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-label"> <strong> Target Language </strong> </lable>
                    <FormControl name="tlanguage" componentClass="select" placeholder="select">
                      {TargetLanguages.map((tlanguage, i) => <option  key={i} value={tlanguage.code}>{tlanguage.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <div className="form-control">
                  <input id="file-input" type="file" className="fileInput" onChange={this.file_base64} multiple />
                </div>&nbsp;
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.uploadFile}> Translate </button>&nbsp;&nbsp;&nbsp;
                  </div>
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default GetTranslationDraft;
