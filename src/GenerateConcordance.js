/**
 * @module src/GenerateConcordance
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: version of the source language
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import SourceLanguages from './SourceLanguages';
import $ from 'jquery';
import GlobalURL from './GlobalURL';


class GenerateConcordance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'tam',
      version: '',
      uploaded:'uploadingStatus',
      message: ''
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
    e.preventDefault();
    var _this = this
    var data = {
      "language": this.state.language, "version": this.state.version
    }
    
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/generateconcordance",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1),
      },
      success: function (result) {
        result = JSON.parse(result)
        _this.setState({message: result.message, uploaded: 'success'})

      },
      error: function (error) {
       _this.setState({message: error.message, uploaded: 'failure'})
      }
    });  
  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header1">Generate Concordance</h1>&nbsp
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger': 'invisible') }>
                <strong>{this.state.message}</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                    <FormControl value={this.state.language} onChange={this.onSelect} name="language" componentClass="select" placeholder="select">
                      { 
                        Object.keys(SourceLanguages[0]).map(function(v, i) {
                          return(<option  key={i} value={v}>{SourceLanguages[0][v]}</option>)
                        })
                      }
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
