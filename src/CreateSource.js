/**
 * @module src/CreateSource
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: version of source language
*/

import React, { Component } from 'react';
import './App.css';
import Footer from './Footer';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import Header from './Header';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class CreateSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language:'',
      version: '',
      uploaded:'Uploading',
      message: '',
      labelData: '',
      valueData: '',
      getTargetLangJson: ''
    }

    // Upload file specific callback handlers
    this.createSource = this.createSource.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/languagelist",
      contentType: "application/json; charset=utf-8",
      method : "GET",
      headers: {
                "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var getTargetLang = JSON.parse(result);
        _this.setState({getTargetLangJson: getTargetLang});
      },
      error: function (error) {
      }
    });
  }

  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  createSource(e){
    var _this = this
      var data = { 
        "language": this.state.selectValue.value, "version": this.state.version
      }
            
      let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
      $.ajax({
        url: GlobalURL["hostURL"]+"/v1/createsources",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        method : "POST",
        async: false,
        headers: {
                  "Authorization": "bearer " + accessToken
        },
      beforeSend: function () {
          $(".modal").show();
      },
        // eslint-disable-next-line
        success: function (result) {
        result = JSON.parse(result)
          if (result.success !== false) {
          _this.setState({message: result.message, uploaded: 'success'})
          setTimeout(function(){
            window.location.href = "./admin";
          },2000)
        }else {
          _this.setState({message: result.message, uploaded: 'failure'})
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          },5000);
          }
      },
      error: function (error) {
        _this.setState({uploaded: 'failure'})
        setTimeout(function(){
          _this.setState({uploaded: 'fail'})
        },5000);
      }
      });
    }

  render() {
    
    var myTarget = this.state.getTargetLangJson;
    var options = {};
    var myOptions = [];

    Object.keys(myTarget).map(function(data, index){
      options = {label: data, value: myTarget[data]};
      myOptions.push(options);
      return null;
    });

    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">Create Sources</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                <VirtualizedSelect
                  options={myOptions}
                  onChange={(selectValue) => this.setState({ selectValue })}
                  value={this.state.selectValue}
                />
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input className="form-control" 
                      value={this.state.version}
                      onChange={this.onSelect}
                      name="version" 
                      type="text"  
                      placeholder="version" 
                      required />
              </div>&nbsp;
              <div className="form-group">
                <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.createSource} disabled={!this.state.version} ><span className="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Create Source</button>&nbsp;&nbsp;&nbsp;
              </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default CreateSource;