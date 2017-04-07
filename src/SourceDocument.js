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
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">Sources</h1>&nbsp;
              <div className="form-goup">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                    <FormControl value={this.state.lang} onChange={this.onSelect} componentClass="select" placeholder="select">
                      {Languages.map((language, i) => <option  key={i} value={language.code}>{language.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-goup">
                <lable className="control-lable"> <strong> Ethnologue Code </strong> </lable>
                      <input value={this.state.lang} onChange={this.onSelect} type="text" name="EthnologueCode" placeholder="tam" className="form-control"/>
              </div>&nbsp;
              <div className="form-goup">
                <lable className="control-lable"> <strong> Translation Version </strong> </lable>
                    <input type="text" placeholder="ULB" className="form-control"/> 
              </div>&nbsp;
              <div className="form-goup">
                <div className="form-control">
                  <input id="file-input" type="file" className="fileInput" multiple />
                </div>&nbsp;
                <div className="form-goup">
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
