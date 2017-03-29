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
import ContentJson from './content';
import $ from 'jquery';

console.log(ContentJson);

class SourceDocument extends Component {
  constructor(props) {
    super(props);

    this.state = {
        LanguageName: '',
        EthnologueCode: '',
        TranslationVersion: ''
      }

      // Upload file specific callback handlers
      this.uploadFile = this.uploadFile.bind(this);
      this.onChange = this.onChange.bind(this);

  }
  
  onChange(e) {
  
    this.setState({ [e.target.name]: e.target.value });
  
  }

  uploadFile(e){
    e.preventDefault()

    $.getJSON('ContentJson', function(data){
            console.log("Its working !!");  
    });

    var ext = $('#file').val().split('.').pop().toLowerCase();
    
      if($.inArray(ext, ['usfm']) === -1) {
        console.log("File is not valid");
      } else {
        console.log("File is valid");
            var fpath = $('#file').val();
            fpath = fpath.replace(/\\/g, '/');
            var fname = fpath.substring(fpath.lastIndexOf('/')+1, fpath.lastIndexOf('.'));
            console.log(fname);
      } 
  }

  render() {
    return(
      <div className="App text-center">
        <Header/ >
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1>Source</h1>
              <div className="form-goup ">
                <lable className="control-label col-sm-2">LanguageName</lable>
                  <div className="col-sm-10">
                    <FormControl componentClass="select" placeholder="select">
                      <option >Select</option>
                      <option value="tam">Tamil</option>
                      <option value="hin">Hindi</option>
                      <option value="eng">English</option>
                      <option value="guj">Gujrati</option>
                      <option value="ben">Bengali</option>
                      <option value="mar">Marathi</option>
                      <option value="san">Sanskrit</option>
                    </FormControl>
                  </div>
              </div>&nbsp;
              <div className="form-goup">
                <lable className="control-lable col-sm-2">Ethnologue Code</lable>
                  <div className="col-sm-10">
                      <input value={this.state.EthnologueCode} onChange={this.onChange} type="text" name="EthnologueCode" placeholder="tam" className="form-control"/>
                  </div>
              </div>&nbsp;
              <div className="form-goup">
                <lable className="control-lable col-sm-2">Translation Version </lable>
                  <div className="col-sm-10">
                    <input value={this.state.TranslationVersion} onChange={this.onChange} type="text" name="TranslationVersion" placeholder="ULB" className="form-control"/> 
                  </div>
              </div>
              <div className="form-goup">
                <div className="col-sm-10">
                  <input id="file" type="file" name="file" className="upload-file" multiple/>
                </div>
              </div> 
              <div className="form-goup">
                <div className="col-sm-10">
                  <input type="button" id="button" value="Upload" className="UploadButton" onClick={this.uploadFile} /> 
                </div>
              </div>
          </form>
        <Footer/>
      </div>
      );
    }
}
export default SourceDocument;
