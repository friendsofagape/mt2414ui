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
      lang:'tam'
    }
      // Upload file specific callback handlers
      this.uploadFile = this.uploadFile.bind(this);
      this.onSelect = this.onSelect.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      lang:e.target.value
    });
  }

  uploadFile(e){
    e.preventDefault();

      var ext = $('#file-input').val().split('.').pop().toLowerCase();
      if($.inArray(ext, ['usfm']) === -1) {
        console.log("File is not valid");
      } else {
        console.log("File is valid");
        var fpath = $('#file-input').val();
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
            <h1>Sources</h1>
              <div className="form-goup">
                <lable className="control-label col-sm-2">Language Name</lable>
                  <div className="col-sm-10">
                    <FormControl value={this.state.lang} onChange={this.onSelect} componentClass="select" placeholder="select">
                      {Languages.map((language, i) => <option  key={i} value={language.code}>{language.value}</option>)}
                    </FormControl>
                  </div>
              </div>&nbsp;
              <div className="form-goup">
                <lable className="control-lable col-sm-2">Ethnologue Code</lable>
                  <div className="col-sm-10">
                      <input value={this.state.lang} onChange={this.onSelect} type="text" name="EthnologueCode" placeholder="tam" className="form-control"/>
                  </div>
              </div>&nbsp;
              <div className="form-goup">
                <lable className="control-lable col-sm-2">Translation Version </lable>
                  <div className="col-sm-10">
                    <input type="text" placeholder="ULB" className="form-control"/> 
                  </div>
              </div>
              <div className="form-goup">
                <div className="col-sm-10">
                  <input id="file-input" type="file" name="file" className="upload-file" multiple/>
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
