/**
 * @module src/SourceDocument
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

class SourceDocument extends Component {
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
      language:e.target.value,
      version:e.target.value
    });
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
   
    $.ajax({
      url: "http://127.0.0.1:8000/v1/sources",
      data: {"language": this.state.language, "version": this.state.version, "content": global.base64_arr},
      method : "POST",
      headers: {
                "Authorization": localStorage.getItem('auth')
      },
      success: function (result) {
        _this.setState({uploaded:'success'})
      },
      error: function (error) {
        _this.setState({uploaded:'failure'}) 
      }
    });   
    
    console.log(this.state.uploaded)

  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">Sources</h1>&nbsp;
            {console.log(this.state.uploaded)}
            <div className={"alert " + this.state.uploaded === 'success'? 'alert-success' : 'invisible'}>
                <strong>File Uploaded Successfully !!!</strong>
            </div>
            <div className={"alert " + this.state.uploaded === 'failure'? 'alert-danger': 'invisible' }>
                <strong>Fail to upload file !!!</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                    <FormControl value={this.state.language} onChange={this.onSelect} name="language" componentClass="select" placeholder="select">
                      {Languages.map((language, i) => <option  key={i} value={language.code}>{language.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Ethnologue Code </strong> </lable>
                      <input value={this.state.language} onChange={this.onSelect} type="text" name="EthnologueCode" placeholder="tam" className="form-control"/>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input  type="text" name="Version" placeholder="version" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <div className="form-control">
                  <input id="file-input" type="file" className="fileInput" onChange={this.file_base64} multiple />
                </div>&nbsp;
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success" onClick={this.uploadFile}>Upload Books</button>
                </div>
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default SourceDocument;
