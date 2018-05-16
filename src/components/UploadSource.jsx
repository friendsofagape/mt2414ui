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
import ListLanguages from './ListLanguages';
import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import Versions from './Versions';
import { Link } from 'react-router-dom';

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
    let _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'));
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/languagelist",
      contentType: "application/json; charset=utf-8",
      method: "GET",
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
      [e.target.name]: e.target.value
    });
  }

  //onSelectSource for Dynamic Versions
  onSelectSource(e) {
    this.setState({ Sourcelanguage: e.target.value });
    let _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    let data = { 
      "language": e.target.value
    };
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/version",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      method: "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        let getVer = JSON.parse(result);
        _this.setState({
          getVersions: getVer.length > 0 ? getVer : []
        })
      },
      error: function (error) {
      }
    });
  }

  //onSelectVersion for Dynamic Revision
  onSelectVersion(e) {
    this.setState({ Version: e.target.value });
    let _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    let data = { 
      "language": this.state.Sourcelanguage, "version" : e.target.value
    };
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/sourceid",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      method: "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var sourceID = JSON.parse(result);
        _this.setState({ allSourceID: sourceID });
      },
      error: function (error) {
      }
    });
  }

//upload file with SourceID
  uploadFile(e){
    e.preventDefault();
    let _this = this;
    let lblError = document.getElementById("lblError");
    
    if($('input[type=file]')[0].files.length === 0) {
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
              } else {
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
                    }, 5000);
                    $(".modal").hide();
                    }        
                  } else {
                    countFailure++;
                    _this.setState({message: result.message, uploaded: 'failure'})
                    if((countSuccess + countFailure) === ($('input[type=file]')[0].files.length)){   
                      _this.setState({message: "Uploaded " + countSuccess + " files successfully", uploaded: 'success'})
                    setTimeout(function() {
                      _this.setState({uploaded: 'fail'})
                    }, 5000);
                    $(".modal").hide();
                    } 
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
      <div>
          <div className="col-md-12">
            <Header/>
          </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 top4">
            <h3>Upload Sources</h3>
          </div>
        </div>
        <div className="row">
            <form className="col-md-12 col-md-4 col-md-offset-4 bodyColor bodyBorder" id="upload_form" encType="multipart/form-data">
              <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
                <strong>{this.state.message}</strong>
              </div>
              <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible')}>
                <strong>{this.state.message}</strong>
              </div>
                <div className="form-group">
                  <label className="control-label"> <strong> Language Name </strong> </label>
                  <ListLanguages 
                    onChange={this.onSelectSource}
                    Language={this.state.getTargetLanguages}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label"> <strong> Version </strong> </label>
                  <Versions 
                    version={this.state.getVersions} 
                    onChange={this.onSelectVersion}
                  />
                </div>
                <div className="form-group">
                  <div className="form-control">
                    <input id="file-input" type="file" className="fileInput" multiple/><br />
                    <span id="lblError" style={style}></span>
                  </div>
                </div>
                <div className="form-group top9">
                  <button type="button" className="btn btn-success btn-block center-block" onClick={this.uploadFile} disabled={!this.state.getVersions} ><span className="glyphicon glyphicon-upload"></span>&nbsp;&nbsp;Upload Source</button>&nbsp;&nbsp;&nbsp;
                </div>

                <div>
                  Can't find your language & version ? &nbsp; &nbsp;<Link to={'/createsource'} className="customLink">Click here !!</Link>
                </div>

                <div className="modal" style={{display: 'none'}}>
                  <div className="center">
                    <img alt="" src={require('../images/loader.gif')} />
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

export default UploadSource;