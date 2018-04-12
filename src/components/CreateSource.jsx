/**
 * @module src/CreateSource
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: version of source language
*/

import React, { Component } from 'react';
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
    this.updateLanguageList = this.updateLanguageList.bind(this);
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

  updateLanguageList(e){
    var _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/updatelanguagelist",
      contentType: "application/json; charset=utf-8",
      method : "GET",
      headers: {
                "Authorization": "bearer " + accessToken
      },
      beforeSend: function () {
        $(".modal").show();
      },
      complete: function () {
        $(".modal").hide();
      },
      success: function (result) {
        $.ajax({
        url: GlobalURL["hostURL"]+"/v1/languagelist",
        contentType: "application/json; charset=utf-8",
        method : "GET",
        headers: {
                  "Authorization": "bearer " + accessToken
        },
        success: function (result) {
          var getTargetLang = JSON.parse(result);
          _this.setState({getTargetLanguages: getTargetLang})
        },
        error: function (error) {
        }
        });
          var resultMes = JSON.parse(result);
        _this.setState({message: resultMes.message, uploaded: 'success'})
        setTimeout(function(){
          _this.setState({ uploaded: 'fail'})
        }, 5000);
      },
      error: function (error) {
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
      <div>
      <div className="col-md-12">
        <Header/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3 className="top3">Create Sources</h3>
          </div>
        </div>

        <div className="row">
            <form className="col-md-12 col-md-4 col-md-offset-4 bodyColor bodyBorder" id="upload_form" encType="multipart/form-data">
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
              <div className="form-group">
                <label className="control-label"> <strong> Language Name </strong> </label>
                <VirtualizedSelect
                  options={myOptions}
                  onChange={(selectValue) => this.setState({ selectValue })}
                  value={this.state.selectValue}
                />
              </div>&nbsp;
              <div className="form-group">
                <label className="control-label"> <strong> Version </strong> </label>
                  <input className="form-control" 
                    value={this.state.version}
                    onChange={this.onSelect}
                    name="version" 
                    type="text"  
                    placeholder="version" 
                    required 
                  />
              </div>
              <div className="row alignCneter">
                <div className="col-md-12">
                  <div className="form-group center-block space">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.createSource}
                      disabled={!this.state.version} >
                      <span className="glyphicon glyphicon-upload">&nbsp;</span>
                      Create Source
                    </button>&nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={this.updateLanguageList}>
                      <span className="glyphicon glyphicon-refresh customLink2">&nbsp;</span>
                      Update Language
                    </button>
                  </div>
                </div>
              </div>
          </form>
          </div>
      </div>
      <div>
        <Footer/>
      </div>
      </div>
      );
    }
}

export default CreateSource;