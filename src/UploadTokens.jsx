/**
 * @module src/UploadTokens
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
import $ from 'jquery';
import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import GlobalURL from './GlobalURL';
import ListLanguages from './Component/ListLanguages';
import Versions from './Component/Versions';
import RevisionNumber from './Component/RevisionNumber';

var jwtDecode = require('jwt-decode');

let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
if(accessToken){
  var decoded = jwtDecode(accessToken);
}

class UploadTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getTargetLanguages: '',
      language:'tam',
      version: '',
      revision: '',
      targetlang: '',
      tokenwords: {},
      uploaded:'Uploading',
      message: '',
      getVersions: [],
      getRevision: [],
      Sourcelanguage: '',
      disabled: false,
      Language: [],
      getTargetLangJson: ''

    }

    // Upload file specific callback handlers
    this.uploadTokens = this.uploadTokens.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectVersion = this.onSelectVersion.bind(this);
    this.onSelectSource = this.onSelectSource.bind(this);
    this.onSelectRevision = this.onSelectRevision.bind(this);
    this.updateTokens = this.updateTokens.bind(this);
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
        _this.setState({getTargetLanguages: getTargetLang})
      },
      error: function (error) {
      }
    });
  }
  
  onSelect(e) {
    this.setState({targetlang: e.target.value });
  }

  focusStateSelect () {
    this.refs.stateSelect.focus();
  }

  //onSelectSource for Dynamic Versions
  onSelectSource(e) {

      this.setState({ Sourcelanguage: e.target.value });
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      var data = { 
        "language": e.target.value
      }
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/version",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var getVer = JSON.parse(result);
        _this.setState({getVersions: getVer.length > 0 ? getVer : []})
      },
      error: function (error) {
      }
    });
  }

  //onSelectVersion for Dynamic Revision
  onSelectVersion(e) {
      this.setState({ Version: e.target.value });
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      var data = { 
        "language": this.state.Sourcelanguage, "version" : e.target.value
      }
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/revision",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var getRev = JSON.parse(result);
        _this.setState({getRevision: getRev.length > 0 ? getRev : []})
      },
      error: function (error) {
      }
    });
  }

  onSelectRevision(e){
    this.setState({Revision: e.target.value });
  }

  //update language list
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


  //for upload tokens using FormData
  uploadTokens(e){   
    e.preventDefault();
    var _this = this;
    var lblError = document.getElementById("lblError");

    if($('input[type=file]')[0].files.length === 0){
      lblError.innerHTML = "Please select files to upload: <b>.xlsx/.xls</b> only.";
    } else {
      for(var i = 0; i < ($('input[type=file]')[0].files.length); i++){
        var uploadForm = document.getElementById("upload_form");
        var formData = new FormData(uploadForm);
        formData.append('tokenwords', $('input[type=file]')[0].files[i]);
        formData.append('language', _this.state.Sourcelanguage)
        formData.append('version', _this.state.Version)
        formData.append('revision', _this.state.Revision)
        formData.append('targetlang', _this.state.selectValue.value)
        let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
        if(formData.get('tokenwords')['name'].slice(-5, ) !== '.xlsx' && formData.get('tokenwords')['name'].slice(-4, ) !== '.xls'){
          lblError.innerHTML = "Please upload files with extension: <b>.xlsx/.xls</b> only.";
          i = $('input[type=file]')[0].files.length;
          $(".modal").hide();
          break;
        } else {
          $.ajax({
            url: GlobalURL["hostURL"]+"/v1/uploadtokentranslation",
            processData: false,
            contentType: false,
            data : formData,
            method : "POST",
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
               result = JSON.parse(result)
               if(result.success !== false) {
                  _this.setState({uploaded: result.success ? 'success' : '', message: result.message})
                  setTimeout(function(){
                    _this.setState({uploaded: 'fail'})
                  },5000);
               }else {
                  _this.setState({message: result.message, uploaded: 'failure'})
                  setTimeout(function(){
                    _this.setState({uploaded: 'fail'})
                  },5000);
               }
            },
            error: function (error) {
             _this.setState({message: "Service Temporarily Unavailable", uploaded: 'failure'})
              setTimeout(function(){
                _this.setState({uploaded: 'fail'})
              },5000);             
            }
          });
        }
      }
    }   
  }

  //for update tokens using FormData
  updateTokens(e) {
    e.preventDefault();    
    var _this = this;
    var lblError = document.getElementById("lblError");

    if($('input[type=file]')[0].files.length === 0){
      lblError.innerHTML = "Please select files to upload: <b>.xlsx/.xls</b> only";
    } else {
        for(var i = 0; i < ($('input[type=file]')[0].files.length); i++){
        var uploadForm = document.getElementById("upload_form");
        var formData = new FormData(uploadForm);
        formData.append('tokenwords', $('input[type=file]')[0].files[i]);
        formData.append('language', _this.state.Sourcelanguage)
        formData.append('version', _this.state.Version)
        formData.append('revision', _this.state.Revision)
        formData.append('targetlang', _this.state.selectValue.value)
        
        let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
        if((formData.get('tokenwords')['name'].slice(-5, ) !== '.xlsx') && (formData.get('tokenwords')['name'].slice(-4, ) !== '.xls')){
          lblError.innerHTML = "Please upload files with extension: <b>.xlsx/.xls</b> only";
          i = $('input[type=file]')[0].files.length;
          $(".modal").hide();
          break;
        } else {
          $.ajax({
            url: GlobalURL["hostURL"]+"/v1/updatetokentranslation",
            processData: false,
            contentType: false,
            data : formData,
            method : "POST",
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

               result = JSON.parse(result)
               if(result.success !== false) {
                  _this.setState({uploaded: result.success ? 'success' : '', message: result.message})
                  setTimeout(function(){
                    _this.setState({uploaded:'fail'})
                  }, 5000);

               }else {
                  _this.setState({message: result.message, uploaded: 'failure'})
                  setTimeout(function(){
                    _this.setState({uploaded:'fail'})
                  }, 5000);
               }
            },
            error: function (error) {
             _this.setState({message: "Service Temporarily Unavailable", uploaded: 'failure'})
              setTimeout(function(){
                _this.setState({uploaded:'fail'})
              }, 5000);
            }
          }); 
        }    
      }
    }
  }

  render() {
    var myTarget = this.state.getTargetLanguages;
    var options = {};
    var myOptions = [];

    Object.keys(myTarget).map(function(data, index){
      options = {label: data, value: myTarget[data]};
      myOptions.push(options);
      return (myOptions);
    });

    var style = { 
      color: 'red',
      margin: 'auto'
    };
    return(
      <div>
        <div className="col-md-12">
            <Header/>
        </div>
        <div className="container">
        <div className="row">
            <div className="col-md-12">
              <h3 className="top4">Upload Tokens</h3>
            </div>
        </div>
        <div className="row top5  bodyColor bodyBorder">
          <form className="col-md-12" id="upload_form" encType="multipart/form-data">
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>&nbsp;&nbsp;  
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible') }>
              <strong>{this.state.message}</strong>
            </div>&nbsp;&nbsp;
            
          <div className="row center-block alignCenter">
             <div className="col-md-8">
                <div className="form-inline tokenForm">
                  <label className="control-label"> <strong> Source Language </strong> </label>
                    <ListLanguages 
                      onChange={this.onSelectSource}
                      Language={this.state.getTargetLanguages}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                  <label className="control-label"> <strong> Version </strong> </label>
                    <Versions 
                      version={this.state.getVersions} 
                      onChange={this.onSelectVersion} 
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                  <label className="control-label"> <strong> Revision </strong> </label>
                    <RevisionNumber
                      revision={this.state.getRevision}
                      onChange={this.onSelectRevision} 
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <label className="control-label"> <strong> Target Language </strong> </label>
                </div>
              </div>
              <div className="col-md-3">             
                <VirtualizedSelect
                  options={myOptions}
                  onChange={(selectValue) => this.setState({ selectValue })}
                  value={this.state.selectValue}
                />
              </div>
              <div className="col-md-1">
                {
                  (decoded.role === 'admin' || decoded.role === 'superadmin') ? (
                    <a href="#" onClick={this.updateLanguageList} title="Update Language"><span className="glyphicon glyphicon-refresh customLink2"></span></a> 
                  ):(
                    <div></div>
                    )
                } 
              </div>
          </div>

          <div className="row alignCenter">
            <div className="col-md-12">
              <section style={this.state.Revision === '' ? {display:'none'} : {display: 'inline'} }>
                <div className="form-group" >
                  <div className="form-control formWidth">
                    <input className="input-file" type="file" id="fileInput"  accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"  multiple />
                    <span id="lblError" style={style}></span>
                  </div>
                </div>
              </section>
             </div>
          </div>

              <div className="row alignCenter">
                <div className="col-md-12">
                {
                  (decoded.role === 'admin' || decoded.role === 'superadmin') ?  (
                  <div className="form-group center-block">
                    <button id="btnGet" type="button" className="btn btn-success" onClick={this.uploadTokens} disabled={!this.state.selectValue} ><span className="glyphicon glyphicon-upload"></span>Upload Tokens</button>&nbsp;&nbsp;&nbsp;
                    <button id="btnGet" type="button" className="btn btn-success" onClick={this.updateTokens} disabled={!this.state.selectValue} ><span className="glyphicon glyphicon-upload"></span>Update Tokens</button>
                  </div>

                  ):(
                    <div className="form-group center-block">
                      <button type="button" className="btn btn-success " onClick={this.uploadTokens} disabled={!this.state.selectValue} ><span className="glyphicon glyphicon-upload"></span>Upload Tokens</button>
                    </div>
                    )
                }
              </div>
            </div>

                <div className="modal" style={{display: 'none'}}>
                  <div className="center">
                    <img alt="" src={require('./Images/loader.gif')} />
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

export default UploadTokens;