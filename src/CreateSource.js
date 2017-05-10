/**
 * @module src/CreateSource
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - content: Content of all the source documents stored
 *  - 
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import Languages from './Languages';
import Versions from './version';
import $ from 'jquery';

class CreateSource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: '',
      version: '',
      revision: ''
    }
      // Upload file specific callback handlers
      this.onSelect = this.onSelect.bind(this);
      this.createSource = this.createSource.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      language:e.target.value,
      version:e.target.value
    });
  }


  createSource(e){

    e.preventDefault();  
    $.ajax({
      url:'',
      data: {"language": this.state.language, "version": this.state.version, "revision": this.this.state.version },
      method : "POST",
      headers: {
                "Authorization": localStorage.getItem('auth')
      },
      success: function (result) {
          this.setState({uploaded:'success'})
      },
      error: function (error) {
         console.log(error);
          this.setState({uploaded:'failure'}) 
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
            <h1 className="source-header">Create Source</h1>&nbsp;
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
                <lable className="control-label"> <strong> Version </strong> </lable>
                    <FormControl value={this.state.version} onChange={this.onSelect} name="version" componentClass="select" placeholder="select">
                      {Versions.map((version, i) => <option  key={i} value={version.code}>{version.value}</option>)}
                    </FormControl>
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Revision </strong> </lable>
                    <input  type="text" name="revision" placeholder="version" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success" onClick={this.createSource}>Create Source</button>
                </div>
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default CreateSource;
