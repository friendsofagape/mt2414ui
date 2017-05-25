/**
 * @module src/GenerateConcordance
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
import $ from 'jquery';


class GenerateConcordance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: '',
      version: '',
      uploaded:'uploadingStatus',
    }
      // Upload file specific callback handlers
      this.onSelect = this.onSelect.bind(this);
      this.generateConcordance = this.generateConcordance.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

// For Generating Concordance
  generateConcordance(e){
    console.log("language: " + this.state.language);
    console.log("version: " + this.state.version);
    e.preventDefault();
    var _this = this
    var data = {
      "language": this.state.language, "version": this.state.version
    }
    $.ajax({
      url: "http://127.0.0.1:8000/v1/generateconcordance",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3VyY2V0ZXh0QHlvcG1haWwuY29tIn0.Xh4Lc8A8Q-l0a6Vjy-KuLK0u6u-et28omajdlPWJY8E"
      },
      success: function (result) {
        _this.setState({uploaded:'success'})
      },
      error: function (error) {
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
            <h1 className="source-header1">Generate Concordance</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>Concordances Created and Stored in DB !!!</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible') }>
                <strong>Concordances could not be generated !!!</strong>
            </div>
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
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success" onClick={this.generateConcordance}>Generating Concordance</button>
                </div>
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default GenerateConcordance;