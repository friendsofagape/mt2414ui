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
import { FormControl, ButtonToolbar} from 'react-bootstrap';
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

//Bookarray for canonical order
var BookArray = ["GEN" : "Genesis", "EXO" : "Exodus", "LEV" : "Leviticus", "NUM" : "Numbers", "DEU" : "Deuteronomy", "JOS" : "Joshua", "JDG" : "Judges", "RUT" : "Ruth", "1SA" : "1 Samuel", "2SA" : "2 Samuel", "1KI" : "1 Kings", "2KI" : "2 Kings", "1CH" : "1 Chronicles", "2CH" : "2 Chronicles", "EZR" : "Ezra", "NEH" : "Nehemiah", "EST" : "Esther", "JOB" : "Job", "PSA" : "Psalms", "PRO" : "Proverbs", "ECC" : "Ecclesiastes", "SNG" : "Songs of Solomon", "ISA" : "Isaiah", "JER" : "Jeremiah", "LAM" : "Lamentations", "EZE" : "Ezekiel", "DAN" : "Daniel", "HOS" : "Hosea", "JOL" : "Joel", "AMO" : "Amos", "OBA" : "Obadiah", "JON" : "Jonah", "MIC" : "Micah", "NAM" : "Nahum", "HAB" : "Habakkuk", "ZEP" : "Zephaniah", "HAG" : "Haggai", "ZEC" : "Zechariah", "MAL" : "Malachi", "MAT" : "Matthew", "MRK" : "Mark", "LUK" : "Luke", "JHN" : "John", "ACT" : "Acts", "ROM" : "Romans", "1CO" : "1 Corinthians", "2CO" : "2 Corinthians", "GAL" : "Galatians", "EPH" : "Ephesians", "PHP" : "Philippians", "COL" : "Colossians", "1TH" : "1 Thessalonians", "2TH" : "2 Thessalonians", "1TI" : "1 Timothy", "2TI" : "2 Timothy", "TIT" : "Titus", "PHM" : "Philemon", "HEB" : "Hebrews", "JAS" : "James", "1PE" : "1 Peter", "2PE" : "2 Peter", "1JN" : "1 John", "2JN" : "2 John", "3JN" : "3 John", "JUD" : "Jude", "REV" : "Revelations"];

class Tabs extends Component {
  render() {
    return (
    <div>
    <ButtonToolbar>
      <ul className="nav nav-tabs customTab">
        {tabData.map(function(tab, i){
          return (
            <Tab key={i} data={tab} isActive={this.props.activeTab === tab} />
          );
        }.bind(this))}      
      </ul>
    </ButtonToolbar>
    </div>
    );
  }
}

class Tab extends Component{
  render() {
    return (
      <li  className={this.props.isActive ? "active" : null}>
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
      targetlang:'Choose',
      version: '',
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
      autoLoad: false,
      BookTokensCount: {},
      displayPercentage: [],
      displayTokenCount: [],
    }

      // Upload file specific callback handlers
      this.DowloadDraft = this.DowloadDraft.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.onSelectSource = this.onSelectSource.bind(this);
      this.onSelectVersion = this.onSelectVersion.bind(this);
      this.onSelectRevision = this.onSelectRevision.bind(this);
      this.exportToUSFMFile = this.exportToUSFMFile.bind(this);
      this.DowloadRemainingTokens = this.DowloadRemainingTokens.bind(this);
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

  createCheckboxes1 = (obj, books, displayPercentage, displayTokenCount) => (
    Object.keys(books).map(function(v, i){
      return (
        <p><Checkbox
            label={booksName2[0][books[v]]}
            handleCheckboxChange={obj.toggleCheckbox1}
            bookCode={books[v]}
            p={displayPercentage[i]}
            tc={displayTokenCount[i]}
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

        //for canonical sorting
        var booksCollection = [];
        for (var i = 0; i < BookArray.length; i++) {
        for( var j = 0; j < getAllBook.length; j++) {
            if(BookArray[i] === getAllBook[j]){
              booksCollection.push(getAllBook[j]);
            }
          }
        }

        _this.getChartData();
        _this.setState({getAllBooks: booksCollection.length > 0 ? booksCollection : []})
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

  //Download Remaining Tokens
  DowloadRemainingTokens(e){
    e.preventDefault();
    global.books = [];
    // eslint-disable-next-line
    for (const books of this.selectedCheckboxes1) {
      global.books = Array.from(this.selectedCheckboxes1);

    }

    var _this = this
    var data = { 
        "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.getRevision[0] , "targetlang": this.state.targetlang, "book_list": global.books 
    }

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    var bookCode = Array.from(this.selectedCheckboxes1);
    if(bookCode.length>1){
      var fileName = this.state.Sourcelanguage + this.state.Version + bookCode[0] +'to'+ bookCode[(bookCode.length)-1]+'Tokens.xlsx';
    } else {
      fileName = this.state.Sourcelanguage + this.state.Version + bookCode[0] +'Tokens.xlsx';
    }

    function beforeSend() {
      document.getElementById("loading").style.display = "inline";
    }

    function complete() {
      document.getElementById("loading").style.display = "none";
    }

    var xhr = new XMLHttpRequest();
    beforeSend();
    xhr.open('POST', GlobalURL["hostURL"]+"/v1/tokenlist", true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', "bearer " + accessToken);
    xhr.onload = function(e) {
      complete();
      if (this.status === 200) {
        var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
        var downloadUrl = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
      } 
      else {
        _this.setState({message: xhr.response.message, uploaded: 'failure'}) 
      }
    };   
    xhr.send(JSON.stringify(data)); 
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
      "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.getRevision[0] , "targetlang": this.state.targetlang
    }

    //Dynamic color for chart
    function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color66 = [];
      for(var j = 0; j<66; j++){
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        color66.push(color);
      }
      return color66;
    }

    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/tokencount",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      beforeSend: function () {
          $(".modal").show();
      },
      complete: function () {
          $(".modal").hide();
      },
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
      var DynamicColor = getRandomColor();
        var getRev = JSON.parse(result);
        Object.keys(getRev).map(function(key, value){
          return _this.state.BookTokensCount[key] = getRev[key];
        });

        _this.setState({BookTokensCount: _this.state.BookTokensCount})
        
        var BookTokensCount = _this.state.BookTokensCount;
        var booksTokenCollection = [];
        var tokenCount = [];
        var totalTokenCount = [];
        var keyArray = [];
        var keyValue = [];
        var remainingPercentage = [];
        Object.keys(BookTokensCount).map(function(key, value){
          return (keyArray.push(key), keyValue.push(BookTokensCount[key]));
        })

        var keyArraylength = keyArray.length;
         for(var i=0; i<BookArray.length; i++){
          for(var j=0; j<keyArraylength; j++){
            if(BookArray[i] === keyArray[j]){
              booksTokenCollection.push(booksName2[0][keyArray[j]]);
              tokenCount.push(keyValue[j][0]);
              totalTokenCount.push(keyValue[j][1]);
            }
          }
         }

        for(i = 0; i < tokenCount.length; i++ ){      
          var calculatedPercentage =Math.round((1 - (tokenCount[i]/totalTokenCount[i]))*100 + "e+2")/100;
          remainingPercentage.push(calculatedPercentage+ '%');
        }

      _this.setState({displayPercentage: remainingPercentage.length > 0 ? remainingPercentage : []}) 
      _this.setState({displayTokenCount: tokenCount.length > 0 ? tokenCount : []})  
     
        if (getRev.success !== false){
        _this.setState({uploaded: getRev.success ? 'success' : '', autoLoad: true})

        _this.setState({
          chartData:{
            labels: booksTokenCollection,
            datasets:[
              {
                label:'Token Count',
                data: tokenCount,
                backgroundColor: DynamicColor,
              }
            ]
          }
        });
        }else {

          _this.setState({message: getRev.message, uploaded: 'failure'})
          setTimeout(function(){
            location.reload();
          },1000);
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
                <strong>Translation Generated Successfully</strong>
            </div>
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg1': 'invisible')}>
                <strong>{this.state.message}</strong>
            </div>
             <div className="form-inline Concord1">&nbsp;&nbsp;&nbsp;&nbsp;
              <lable className="control-label Concord2"> <strong> Source Language </strong> </lable>
                <ListLanguages 
                  onChange={this.onSelectSource} 
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
              </div>&nbsp;
              <div>
                <section style={this.state.getAllBooks === '' ? {display:'none'} : {display: 'inline'} } >
                {(this.state.autoLoad === false)?(this.autoLoad=false):(<Chart 
                  chartData={this.state.chartData}
                  targetlang={this.state.targetlang}
                  location="Bar Chart" legendPosition="bottom"
                />) }

                <Tabs activeTab={this.state.activeTab}/>
                <div className="exclude2">{this.createCheckboxes1(this, this.state.getAllBooks, this.state.displayPercentage, this.state.displayTokenCount)}</div>
                </section>
              </div>
                <div className="form-group"> 
                  <button id="btnGet" type="button" className="btn btn-success ConcordButtonLeft" onClick={this.DowloadDraft} disabled={!this.state.getAllBooks} ><span className="glyphicon glyphicon-download-alt">&nbsp;</span> Download Drafts </button>&nbsp;&nbsp;&nbsp;
                  <button id="btnGet" type="button" className="btn btn-success ConcordButtonRight" onClick={this.DowloadRemainingTokens} disabled={!this.state.getAllBooks} ><span className="glyphicon glyphicon-download-alt">&nbsp;</span> Download Remaining Tokens </button>&nbsp;&nbsp;&nbsp;
                </div>
                <div id="loading" className="modal" style={{display: 'none'}}>
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
