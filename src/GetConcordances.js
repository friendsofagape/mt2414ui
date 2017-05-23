/**
 * @module src/UploadSource
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
import Languages from './Languages';
import $ from 'jquery';

class GetConcordances extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language:'',
      version: '',
      base64_arr: [],
      uploaded:'uploadingStatus',
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
      console.log("File is not valid");
    } else {
      console.log("File is valid");
    } 

    var _this = this
    console.log("Languages: " + this.state.language);
    console.log("Version: " + this.state.version);
    console.log("Content: " + global.base64_arr);
    var data = { 
            "language": this.state.language, "version": this.state.version, "content": global.base64_arr
          }

    $.ajax({
      url: "http://127.0.0.1:8000/v1/sources",
      dataType : "json",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3VyY2V0ZXh0QHlvcG1haWwuY29tIn0.Xh4Lc8A8Q-l0a6Vjy-KuLK0u6u-et28omajdlPWJY8E"

      },
      success: function (result) {
         console.log("Sources Uploaded Successfully !!!")
        _this.setState({uploaded:'success'})
      },
      error: function (error) {
         console.log(error);
        _this.setState({uploaded:'failure'}) 
      }
    });   
    
  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">GetConcordances</h1>&nbsp;
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                    <FormControl value={this.state.language} onChange={this.onSelect} name="language" componentClass="select" placeholder="select">
                      {Languages.map((language, i) => <option  key={i} value={language.code}>{language.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Revision </strong> </lable>
                    <input value={this.state.revision} onChange={this.onSelect} name="revision" type="text" placeholder="revision" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong>Token </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                  <button id="button" type="button" className="btn btn-success" onClick={this.uploadFile}>Get Concordances</button>&nbsp;&nbsp;&nbsp;
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default GetConcordances;
