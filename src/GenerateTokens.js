/**
 * @module src/GenerateTokens
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


class GenerateTokens extends Component {
  constructor(props) {
    super(props);

    this.state = {
      language: '',
      version: '',
      revision: '',
      uploaded:'uploadingStatus',
    }
      // Upload file specific callback handlers
      this.onSelect = this.onSelect.bind(this);
      this.downloadTokenWords = this.downloadTokenWords.bind(this);
      this.generateConcordance = this.generateConcordance.bind(this);
      this.JSONToCSVConvertor = this.JSONToCSVConvertor.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

// For Downloads Token words
  downloadTokenWords(e){
    console.log("language: " + this.state.language);
    console.log("version: " + this.state.version);
    console.log("revision: " + this.state.revision);
    e.preventDefault();
    var _this = this
    var data = { 
        "language": this.state.language, "version": this.state.version, "revision": this.state.revision 
      }
    $.ajax({
      url: "http://127.0.0.1:8000/v1/tokenwords",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3VyY2V0ZXh0QHlvcG1haWwuY29tIn0.Xh4Lc8A8Q-l0a6Vjy-KuLK0u6u-et28omajdlPWJY8E"
      },
      success: function (result) {
        if (result){
         _this.JSONToCSVConvertor(result, "Tokens Report", true);
        }
        console.log("Success in Generate Tokens");
        _this.setState({uploaded:'success'})
      },
      error: function (error) {
         console.log("Failled in Generate Tokens");
          _this.setState({uploaded:'failure'}) 
      }
    });  
  }

  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData1 = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    
    var arrData = arrData1.tokenwords

    var CSV = '';       
    CSV += ReportTitle + '\r\n\n';

    if (ShowLabel) {
        var row = "";
          for (var index in arrData[0]) {
          row += index + ',';
          console.log("Row: " + arrData);
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    
    for (var i = 0; i < arrData.length; i++) {
        for (index in arrData[i]) {
          // row += '"' + arrData[i][index] + '",';    
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }

    if (CSV === '') {        
        alert("Invalid data");
        return;
    }   

    var fileName = "TokenWords_";
    fileName += ReportTitle.replace(/ /g,"_");   
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        console.log("Concordances Created and Stored in DB");
        _this.setState({uploaded:'success'})
      },
      error: function (error) {
        console.log("Concordances was not generated !!!");
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
            <h1 className="source-header">Generate Token</h1>&nbsp;
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
                <lable className="control-lable"> <strong> Version </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <lable className="control-lable"> <strong> Revision </strong> </lable>
                    <input value={this.state.revision} onChange={this.onSelect} name="revision" type="text" placeholder="revision" className="form-control"/> 
              </div>&nbsp;
              <div className="form-group">
                <div className="form-group">
                  <button id="button" type="button" className="btn btn-success" onClick={this.downloadTokenWords}>Download Token</button>&nbsp;&nbsp;
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

export default GenerateTokens;
