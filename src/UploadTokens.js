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
import { FormControl } from 'react-bootstrap';
import TargetLanguages from './TargetLanguages';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import ListLanguages from './Component/ListLanguages'
import Versions from './Component/Versions';
import RevisionNumber from './Component/RevisionNumber';

class UploadTokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }

    // Upload file specific callback handlers
    this.uploadTokens = this.uploadTokens.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectVersion = this.onSelectVersion.bind(this);
    this.onSelectSource = this.onSelectSource.bind(this);
    this.onSelectRevision = this.onSelectRevision.bind(this);
  }
  
  onSelect(e) {
    this.setState({targetlang: e.target.value });
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

  //for upload tokens using FormData
  uploadTokens(e){   
    e.preventDefault();    
    var _this = this;

    for(var i = 0; i < ($('input[type=file]')[0].files.length); i++){

      var uploadForm = document.getElementById("upload_form");
      var formData = new FormData(uploadForm);
      formData.append('tokenwords', $('input[type=file]')[0].files[i]);
      formData.append('language', _this.state.Sourcelanguage)
      formData.append('version', _this.state.Version)
      formData.append('revision', _this.state.Revision)
      formData.append('targetlang', _this.state.targetlang)

      let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

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
           }else {
              _this.setState({message: result.message, uploaded: 'failure'})
           }
        },
        error: function (error) {
         _this.setState({message: error.message, uploaded: 'failure'})
        }
      }); 
    }    
  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="row">
          <form className="col-md-12 uploader" id="upload_form" encType="multipart/form-data">
            <h1 className="source-headerCon1">Upload Tokens</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible') }>
              <strong>{this.state.message}</strong>
            </div>
            <div className="form-inline Concord1">&nbsp;&nbsp;&nbsp;&nbsp;
              <lable className="control-label Concord2"> <strong> Source Language </strong> </lable>
                <ListLanguages 
                  onChange={this.onSelectSource} 
                />
              <lable className="control-lable Concord2"> <strong> Version </strong> </lable>
                <Versions 
                  version={this.state.getVersions} 
                  onChange={this.onSelectVersion} 
                />
              <lable className="control-lable Concord2"> <strong> Revision </strong> </lable>
                <RevisionNumber
                  revision={this.state.getRevision}
                  onChange={this.onSelectRevision} 
                />
              <lable className="control-label Concord2"> <strong> Target Language </strong> </lable>
                <FormControl value={this.state.targetlang} onChange={this.onSelect} name="targetlang" componentClass="select" placeholder="select">
                  <option>Choose</option>
                  { 
                    Object.keys(TargetLanguages[0]).map(function(v, i) {
                      return(<option  key={i} value={v}>{TargetLanguages[0][v]}</option>)
                    })
                  }    
                </FormControl>&nbsp;&nbsp;
            </div>&nbsp;
            <section style={this.state.targetlang === '' ? {display:'none'} : {display: 'inline'} }>
              <div className="form-group customUpload1" >
                <div className="form-control">
                  <input className="input-file" type="file" id="fileInput"  accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"  multiple />
                  <div className="customUpload2">
                  <b>(.xlsx / .xls only)</b>
                  </div>
                </div>&nbsp;
              </div>
            </section>
                <div className="form-group customUpload">
                  <button id="btnGet" type="button" className="btn btn-success sourcefooter" onClick={this.uploadTokens} disabled={!this.state.targetlang} ><span className="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Upload Tokens</button>&nbsp;&nbsp;&nbsp;
                </div>
                  <div className="modal" style={{display: 'none'}}>
                    <div className="center">
                      <img alt="" src={require('./Images/loader.gif')} />
                    </div>
                  </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default UploadTokens;