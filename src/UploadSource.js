/**
 * @module src/UploadSource
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: version of source language
 *  - source_id: source_id also pass in request
 *  - base64_arr: file in the form of base64
*/

import React, { Component } from 'react';
import './App.css';
import ListLanguages from './Component/ListLanguages';
import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import Versions from './Component/Versions';
import { Link } from 'react-router';

class UploadSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourcelang:'',
      version: '',
      getVersions: [],
      allSourceID: '',
      uploaded:'Uploading',
      message: '',
      getTargetLanguages: ''
    }

    // Upload file specific callback handlers
    this.uploadFile = this.uploadFile.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectSource = this.onSelectSource.bind(this);
    this.onSelectVersion = this.onSelectVersion.bind(this);
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
    this.setState({
      [e.target.name]: e.target.value });
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
        url: GlobalURL["hostURL"]+"/v1/sourceid",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(data),
        method : "POST",
        headers: {
          "Authorization": "bearer " + accessToken
        },
        success: function (result) {
          var sourceID = JSON.parse(result);
          _this.setState({allSourceID: sourceID})
        },
        error: function (error) {
        }
      });
  }

//upload file with SourceID
  uploadFile(e){
    e.preventDefault();
    var _this = this
    var lblError = document.getElementById("lblError");
    
    if($('input[type=file]')[0].files.length === 0){
      lblError.innerHTML = "Please select a files to upload: <b> .usfm </b> only.";
    } else {
            if(this.state.allSourceID){
              for(var i = 0; i < ($('input[type=file]')[0].files.length); i++){
              var uploadForm = document.getElementById("upload_form");
              var formData = new FormData(uploadForm);
              formData.append('content', $('input[type=file]')[0].files[i]);
              formData.append('source_id', this.state.allSourceID)
              let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
              var countSuccess = 0;
              var countFailure = 0;

              if(formData.get('content')['name'].slice(-5, ) !== '.usfm'){
                lblError.innerHTML = "Please upload files having extensions: <b> .usfm </b> only.";
                i = $('input[type=file]')[0].files.length;
                $(".modal").hide();
                break;
              }else{
                lblError.innerHTML = " ";
                $.ajax({
                url: GlobalURL["hostURL"]+"/v1/sources",
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
                // eslint-disable-next-line
                success: function (result) {
                result = JSON.parse(result)
                  if (result.success !== false) {
                      countSuccess++;
                    _this.setState({message: "Uploading ...... file no." + countSuccess, uploaded: 'success'})
                    if((countSuccess + countFailure) === ($('input[type=file]')[0].files.length)){  
                      _this.setState({message: "Uploaded " + countSuccess + " files successfully", uploaded: 'success'})
                      setTimeout(function(){
                        _this.setState({uploaded: 'fail'})
                      },5000);
                      $(".modal").hide();
                    }        
                  }else {
                    countFailure++;
                    _this.setState({message: result.message, uploaded: 'failure'})
                    if((countSuccess + countFailure) === ($('input[type=file]')[0].files.length)){   
                       _this.setState({message: "Uploaded " + countSuccess + " files successfully", uploaded: 'success'})
                      setTimeout(function(){
                        _this.setState({uploaded: 'fail'})
                      },5000);
                       $(".modal").hide();
                    } 
                  }
                }
              });
                } 
              }
            } else {
              lblError.innerHTML = "Please select a <b>language</b> & <b>version</b>";
            }
          }
     }

  render() {
    var style = { 
      color: 'red',
      margin: 'auto'
    }; 
    return(
      <div className="container">
        <Header / >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" id="upload_form" encType="multipart/form-data">
            <h1 className="source-header">Upload Sources</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
              <div className="form-group">
                <lable className="control-label"> <strong> Language Name </strong> </lable>
                <ListLanguages 
                  onChange={this.onSelectSource}
                  Language={this.state.getTargetLanguages}
                />
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Version </strong> </lable>
                <Versions 
                         version={this.state.getVersions} 
                         onChange={this.onSelectVersion}
                />
              </div>&nbsp;
              <div className="form-group">
                <div className="form-control">
                  <input id="file-input" type="file" className="fileInput" multiple/><br />
                  <span id="lblError" style={style}></span>
                </div>&nbsp;
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.uploadFile} disabled={!this.state.getVersions} ><span className="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Upload Source</button>&nbsp;&nbsp;&nbsp;
                </div>
                <div>
                  Can't find your language & version ? &nbsp; &nbsp;<Link to={'/createsource'} className="customLink">Click here !!</Link>
                </div>
                  <div className="modal" style={{display: 'none'}}>
                    <div className="center">
                        <img alt="" src={require('./Images/loader.gif')} />
                    </div>
                  </div>
              </div>
          </form>
          </div>
        <Footer />
      </div>
      );
    }
}

export default UploadSource;