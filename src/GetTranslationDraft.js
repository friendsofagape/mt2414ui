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
import { FormControl, Tooltip, OverlayTrigger, ButtonToolbar} from 'react-bootstrap';
import TargetLanguages from './TargetLanguages';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import saveAs from 'save-as'
import Checkbox from './Checkbox';
import booksName2 from './BookName';
import ListLanguages from './Component/ListLanguages'
import Versions from './Component/Versions';
import RevisionNumber from './Component/RevisionNumber';
import Chart from './Component/Chart';
var JSZip = require("jszip");
var zip;

var tabData = [
  { name: 'Select Books', isActive: true }
];

class Tabs extends Component {
  render() {
    const tooltip = (<Tooltip id="tooltip"><strong>Select Books !! </strong> Click for Token Count Bar Chart </Tooltip>);
    return (
    <ButtonToolbar>
    <OverlayTrigger placement="left" overlay={tooltip}>
      <ul className="nav nav-tabs customTab">
        {tabData.map(function(tab, i){
          return (
            <Tab key={i} data={tab} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this,tab)} />
          );
        }.bind(this))}      
      </ul>
    </OverlayTrigger>
    </ButtonToolbar>
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
      sourcelang:'tam',
      targetlang:'mal',
      version: 'ULB',
      revision: '',
      bookName: '',
      books: [],
      uploaded:'Uploading',
      activeTab: tabData[0],
      activeTabValue: '',
      getVersions: [''],
      getRevision: [''],
      Sourcelanguage: '',
      getAllBooks: '',
      chartData:{},
      dataDisplay: 'Exclude Books',
    }

      // Upload file specific callback handlers
      this.DowloadDraft = this.DowloadDraft.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.onSelectSource = this.onSelectSource.bind(this);
      this.onSelectVersion = this.onSelectVersion.bind(this);
      this.onSelectRevision = this.onSelectRevision.bind(this);
      this.exportToUSFMFile = this.exportToUSFMFile.bind(this);
      this.handleClick = this.handleClick.bind(this);

  }
  
    handleClick(tab){
    this.setState({
      activeTab: tab,
      dataDisplay: tab.name
    });
  }

  componentWillMount = () => {
    this.selectedCheckboxes1 = new Set();
  }

  toggleCheckbox1 = label => {
    if (this.selectedCheckboxes1.has(label)) {
      this.selectedCheckboxes1.delete(label);
    } else {
      this.selectedCheckboxes1.add(label);
    }
  }

  createCheckboxes1 = (obj, books) => (
    Object.keys(books).map(function(v, i){
      return (
        <p><Checkbox
            label={booksName2[0][books[v]]}
            handleCheckboxChange={obj.toggleCheckbox1}
            bookCode={books[v]}
          />
        </p>
      );
    })
  )

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

  //onSelectRevision for Dynamic list of the boosk
  onSelectRevision(e) {
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      var data = { 
        "language": this.state.Sourcelanguage, "version" : this.state.Version, "revision": e.target.value, "targetlang": this.state.targetlang,
      }
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/book",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var getAllBook = JSON.parse(result);
        _this.setState({getAllBooks: getAllBook.length > 0 ? getAllBook : []})
      },
      error: function (error) {
      }
     });

  }

  DowloadDraft(e){
    e.preventDefault();
    global.books = [];

    // eslint-disable-next-line
    for (const books of this.selectedCheckboxes1) {  
      global.books = Array.from(this.selectedCheckboxes1);
    }

    var _this = this
    var data = { 
      "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.getRevision[0] , "targetlang": this.state.targetlang, "books": global.books 
    }

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/translations",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
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
          if (result.success !== false) {
          _this.exportToUSFMFile(result)
          _this.getChartData()
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

//for Download Zip file
  exportToUSFMFile(jsonData) {
    var _this = this;
    zip = new JSZip();
    $.each(jsonData, function(key, value) {
      zip.file(key + '.usfm', value)
    });
    zip.generateAsync({type:"blob"})
      .then(function(content) {
          saveAs(content, _this.state.targetlang + '.zip');
      }, function(err){
         _this.setState({uploaded: 'failure'}) 
      })
  }


//for Bar chart
  getChartData(){
    var _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    var data = { 
      "sourcelang": this.state.Sourcelanguage, "version": this.state.version, "revision": this.state.getRevision[0] , "targetlang": this.state.targetlang
    }
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/tokencount",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var labelsRes = [];
        var datasetsRes = [];
        var getRev = JSON.parse(result);
        if (getRev.success !== false){
        _this.setState({uploaded: getRev.success ? 'success' : ''})
        // eslint-disable-next-line
        Object.keys(getRev).map(function(v, i) {
          labelsRes.push(v)
          datasetsRes.push(getRev[v])
        })
        _this.setState({
          chartData:{
            labels: labelsRes,
            datasets:[
              {
                label:'Token Count',
                data: datasetsRes,
                backgroundColor: ['aqua', 'blueviolet', 'burlywood', 'chartreuse', 'cadetblue', 'darkgreen', 'darkcyan',
                  'beige', 'aquamarine', 'brown', 'crimson', 'darkorchid', 'hotpink', 'goldenrod', 'gold', 'indigo'
                ],
              }
            ]
          }
        });
        }else {
          _this.setState({message: getRev.message, uploaded: 'failure'})
        }
        },
      error: function (error) {
      }
    });
  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="row">
          <form className="col-md-12 uploader" encType="multipart/form-data">
            <h1 className="source-headerCon">Download Translation Draft</h1>&nbsp;
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg1' : 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg1': 'invisible')}>
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
                  Sourcelanguage={this.state.Sourcelanguage} 
                  Version={this.state.Version} 
                  onChange={this.onSelectRevision}
                />
                <lable className="control-label Concord2"> <strong> Target Language </strong> </lable>
                    <FormControl value={this.state.targetlang} onChange={this.onSelect} name="targetlang" componentClass="select" placeholder="select">
                      { 
                        Object.keys(TargetLanguages[0]).map(function(v, i) {
                          return(<option  key={i} value={v}>{TargetLanguages[0][v]}</option>)
                        })
                      }    
                    </FormControl>&nbsp;&nbsp;
              </div>&nbsp;
              <div>
                <Tabs activeTab={this.state.activeTab}  changeTab={this.handleClick}/>
                <section className="panel panel-success" >
              <div style={this.state.dataDisplay === 'Exclude Books' ? {display:'none'} : {display: 'inline'} } >
              <Chart 
                chartData={this.state.chartData}
                revision={this.state.getRevision}  
                Sourcelanguage={this.state.Sourcelanguage} 
                Version={this.state.Version} 
                location="Bar Chart" legendPosition="bottom"
              />
              </div>
                  <div className="exclude2">{this.createCheckboxes1(this, this.state.getAllBooks)}</div>
                </section>
              </div>
                <div className="form-group"> 
                  <button id="btnGet" type="button" className="btn btn-success ConcordButton" onClick={this.DowloadDraft}><span className="glyphicon glyphicon-download-alt">&nbsp;</span> Download Drafts </button>&nbsp;&nbsp;&nbsp;
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

export default GetTranslationDraft;
