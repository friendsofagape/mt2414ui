/**
 * @module src/GetTranslationDraft
 *
 * Component that display GetTranslationDraft
 * Accepts the following properties:
 *  - source language: Which language you want to convert from 
 *  - version : Version of source language
 *  - target language: In which tokens have been translated too
 *  - token words: token words showul be entered in the form of xls
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import SourceLanguages from './SourceLanguages';
import TargetLanguages from './TargetLanguages';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import saveAs from 'save-as'
import Checkbox from './Checkbox';
import booksName1 from './BookName';
import booksName2 from './BookName';
var JSZip = require("jszip");
var zip = new JSZip();

var tabData = [
  { name: 'Select Books', isActive: true }
];

class Tabs extends Component {
  render() {
    return (
      <ul className="nav nav-tabs customTab">
        {tabData.map(function(tab, i){
          return (
            <Tab key={i} data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
          );
        }.bind(this))}      
      </ul>
    );
  }
}

class Tab extends Component{
  render() {
    return (
      <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
        <a href="#">{this.props.data.name}</a>
      </li>
    );
  }
}

class GetTranslationDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourcelang:'Tamil',
      targetlang:'Malayalam',
      version: '',
      revision: '',
      bookName: '',
      uploaded:'Uploading',
      activeTab: tabData[0],
      activeTabValue: '',
      dataDisplay: 'Select Books'
    }

      // Upload file specific callback handlers
      this.uploadFile = this.uploadFile.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.exportToUSFMFile = this.exportToUSFMFile.bind(this);
      this.handleClick = this.handleClick.bind(this);

  }
  
    handleClick(tab){
    console.log(tab)  
    this.setState({
      activeTab: tab,
      dataDisplay: tab.name
    });
  }

  componentWillMount = () => {
    this.selectedCheckboxes1 = new Set();
    this.selectedCheckboxes2 = new Set();
  }

  toggleCheckbox1 = label => {
    if (this.selectedCheckboxes1.has(label)) {
      this.selectedCheckboxes1.delete(label);
    } else {
      this.selectedCheckboxes1.add(label);
    }
  }

  toggleCheckbox2 = label => {
    if (this.selectedCheckboxes2.has(label)) {
      this.selectedCheckboxes2.delete(label);
    } else {
      this.selectedCheckboxes2.add(label);
    }
  }

  createCheckboxes1 = (obj) => (
    Object.keys(booksName1[0]).map(function(v, i){

      return (<Checkbox
            label={booksName1[0][v]}
            handleCheckboxChange={obj.toggleCheckbox1}
            bookCode={v}
    />)
    })

  )

  createCheckboxes2 = (obj) => (
    Object.keys(booksName2[0]).map(function(v, i){
      return (<Checkbox
            label={booksName2[0][v]}
            handleCheckboxChange={obj.toggleCheckbox2}
            bookCode={v}
    />)
    })

  )

  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  uploadFile(e){
    e.preventDefault();
    var _this = this
    var data = { 
            "sourcelang": this.state.sourcelang, "version": this.state.version, "revision": this.state.revision,  "targetlang": this.state.targetlang
          }
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/translations",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      beforeSend: function () {
          $(".modal").show();
      },
      complete: function () {
          $(".modal").hide();
      },
      success: function (result) {
         if (result.success !== false) {
          _this.exportToUSFMFile(result)
          _this.setState({message: result.message, uploaded: 'success'})
        }else {
          _this.setState({message: result.message, uploaded: 'failure'})
          }
      },
      error: function (error) {
        _this.setState({uploaded: 'failure'}) 
      }
    });   
    
  }

  exportToUSFMFile(jsonData) {
    var _this = this;
    jsonData = JSON.parse(jsonData)
    let exportFileDefaultName = [];
    $.each(jsonData, function(key, value) {
      zip.file(key + '.usfm', value)
      exportFileDefaultName.push(key + '.usfm');
    });
    zip.generateAsync({type:"blob"})
      .then(function(content) {
          saveAs(content, _this.state.targetlang + '.zip');
      }, function(err){
         _this.setState({uploaded: 'failure'}) 
      })
  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="row">
          <form className="col-md-12 uploader" encType="multipart/form-data">
            <h1 className="source-headerCon">Download Translation Draft</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
                <strong>Translation Done Successfully !!!</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible')}>
                <strong>Failed to Translate Sources !!!</strong>
            </div>
             <div className="form-inline Concord1">&nbsp;&nbsp;&nbsp;&nbsp;
                <lable className="control-label Concord2"> <strong> Source Language </strong> </lable>
                    <FormControl value={this.state.sourcelang} onChange={this.onSelect} name="sourcelang" componentClass="select" placeholder="select">
                      {SourceLanguages.map((sourcelang, i) => <option  key={i} value={sourcelang.value}>{sourcelang.value}</option>)}
                    </FormControl>&nbsp;&nbsp;
                 <lable className="control-lable Concord2"> <strong> Version </strong> </lable>
                    <input value={this.state.version} onChange={this.onSelect} name="version" type="text"  placeholder="version" className="form-control"/>&nbsp; 
                <lable className="control-lable Concord2"> <strong> Revision </strong> </lable>
                    <input value={this.state.revision} onChange={this.onSelect} name="revision" type="text" placeholder="revision" className="form-control"/> &nbsp;
                <lable className="control-label Concord2"> <strong> Target Language </strong> </lable>
                    <FormControl value={this.state.targetlang} onChange={this.onSelect} name="targetlang" componentClass="select" placeholder="select">
                      {TargetLanguages.map((targetlang, i) => <option  key={i} value={targetlang.value}>{targetlang.value}</option>)}
                    </FormControl>&nbsp;&nbsp;
              </div>&nbsp;
              <div>
                <Tabs activeTab={this.state.activeTab}  changeTab={this.handleClick}/>
                <section className="panel panel-success" style={this.state.dataDisplay === 'Exclude Books' ? {display:'none'} : {display: 'inline'} }>
                  <div className="exclude2">{this.createCheckboxes1(this)}</div>
                </section>
              </div>
                <div className="form-group"> 
                  <button id="btnGet" type="button" className="btn btn-success ConcordButton" onClick={this.uploadFile}><span className="glyphicon glyphicon-download-alt">&nbsp;</span> Download Drafts </button>&nbsp;&nbsp;&nbsp;
                </div>
                <div className="modal" style={{display: 'none'}}>
                    <div className="center">
                        <img alt="" src={require('./loader.gif')} />
                    </div>
                </div>
          </form>
          </div>
        <Footer/>
      </div>
      );
    }
}

export default GetTranslationDraft;
