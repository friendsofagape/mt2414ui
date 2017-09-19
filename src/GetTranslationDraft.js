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
import {ButtonToolbar} from 'react-bootstrap';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import saveAs from 'save-as'
import Checkbox from './Checkbox';
import booksName2 from './BookName';
import ListLanguages from './Component/ListLanguages';
import ListTargetLanguage from './Component/ListTargetLanguage';
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
      Targetlanguage: '',
      getAllBooks: '',
      chartData:{},
      dataDisplay: 'Exclude Books',
      autoLoad: false,
      BookTokensCount: {},
      displayPercentage: [],
      displayTokenCount: [],
      getTargetLanguages: '',
      getTargetLangList: ['']
    }

      // Upload file specific callback handlers
      this.DowloadDraft = this.DowloadDraft.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.onSelectSource = this.onSelectSource.bind(this);
      this.onSelectTargetLanguage = this.onSelectTargetLanguage.bind(this);
      this.onSelectVersion = this.onSelectVersion.bind(this);
      this.onSelectRevision = this.onSelectRevision.bind(this);
      this.exportToUSFMFile = this.exportToUSFMFile.bind(this);
      this.DowloadRemainingTokens = this.DowloadRemainingTokens.bind(this);
  }
  
  componentDidMount = () => {
    this.selectedCheckboxes1 = new Set();
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
        <span key={i} className="disBook"><Checkbox
            label={booksName2[0][books[v]]}
            handleCheckboxChange={obj.toggleCheckbox1}
            bookCode={books[v]}
            p={displayPercentage[i]}
            tc={displayTokenCount[i]}
          />
        </span>
      );
    })
  )

  onSelect(e) {
    this.setState({ Targetlanguage: e.target.value });
  }


  //onSelectSource for Dynamic Versions
  onSelectSource(e) {
      var _this = this;
      _this.setState({ Sourcelanguage: e.target.value });
      _this.setState({getVersions: ['']})
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
      var _this = this;
      _this.setState({ Version: e.target.value });
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

  //onSelectRevision for set value of the revision
  onSelectRevision(e) {
    this.setState({ Revision: e.target.value });
  }

  //OnSelectbook for the list of the book
  onSelectBook(e){

      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      var data = { 
        "language": _this.state.Sourcelanguage, "version" : _this.state.Version, "revision": _this.state.Revision, "targetlang": e.target.value
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
        _this.setState({getAllBooks: booksCollection.length > 0 ? booksCollection : []})
      },
      error: function (error) {
      }
     });
  }

  //onSelectTargetLanguage for Dynamic Target Language
  onSelectTargetLanguage(e){
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      var data = { 
        "language": this.state.Sourcelanguage, "version": this.state.Version, "revision": e.target.value
      }
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/targetlang",
      contentType: "application/json; charset=utf-8",
      data : JSON.stringify(data),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var getTargetLanguage = JSON.parse(result);
        _this.setState({getTargetLangList: getTargetLanguage.length > 0 ? getTargetLanguage : []})
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
      "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision , "targetlang": this.state.Targetlanguage, "books": global.books 
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
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          }, 5000);
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

    // For file name changes
    var ListofLanguage = _this.state.getTargetLanguages;
    var FileNameSlanguage = '';
    if(ListofLanguage != null){
      Object.keys(ListofLanguage).map(function(data, index){
          if(ListofLanguage[data]  === _this.state.Sourcelanguage){
            FileNameSlanguage = data;
          }
        return null;
      })
    }

    var data = { 
        "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision , "targetlang":this.state.Targetlanguage, "book_list": global.books 
    }

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    var bookCode = Array.from(this.selectedCheckboxes1);
    if(bookCode.length>1){
      var fileName = FileNameSlanguage + this.state.Version + booksName2[0][bookCode[0]] +'to'+ booksName2[0][bookCode[(bookCode.length)-1]]+'Tokens.xlsx';
    } else {
      fileName = FileNameSlanguage + this.state.Version + booksName2[0][bookCode[0]] +'Tokens.xlsx';
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
     if(this.status === 400){
      const blb    = new Blob([this.response], {type: "text/plain"});
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        const text = e.srcElement.result;
        console.log(JSON.parse(text)["message"]);
        _this.setState({message: JSON.parse(text)["message"], uploaded: 'failure'})
        setTimeout(function(){
          _this.setState({uploaded: 'fail'})
        }, 5000);
      });
      reader.readAsText(blb);

      }
    };   
    xhr.send(JSON.stringify(data)); 
  }

  //for Download Zip file
  exportToUSFMFile(jsonData) {
    var _this = this;

    var ListofLanguage = _this.state.getTargetLanguages;
    var FileNameSlanguage = '';
    var FileNameTlanguage = '';
    if(ListofLanguage != null){
      Object.keys(ListofLanguage).map(function(data, index){
          if(ListofLanguage[data]  === _this.state.Sourcelanguage){
            FileNameSlanguage = data;
          }
          if(ListofLanguage[data] === _this.state.Targetlanguage){
            FileNameTlanguage = data;
          }
        return null;
      })
    }

    zip = new JSZip();
    $.each(jsonData, function(key, value) {
      zip.file(key + '.usfm', value)
    });
    zip.generateAsync({type:"blob"})
      .then(function(content) {
          saveAs(content, FileNameSlanguage + 'To' + FileNameTlanguage + '.zip');
      }, function(err){
         _this.setState({uploaded: 'failure'}) 
      })
  }


  //for Bar chart
  getChartData(e){
    var _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    var data = { 
      "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision , "targetlang": e.target.value
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
          var calculatedPercentage = Math.round((1 - (tokenCount[i]/totalTokenCount[i]))*100 + "e+2")/100;
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
      <div>
        <Header/>
      <div className="container" >
        <div className="row">
          <div className="col-md-12">
            <h3>Download Translation Draft</h3>
          </div>
        </div>
        <div className="row bodyBorder bodyColor">
          <form className="col-md-12 alignCenter" encType="multipart/form-data">
            <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
                <strong>Translation Generated Successfully</strong>
            </div>&nbsp;&nbsp;
            <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible')}>
              <strong>{this.state.message}</strong>
            </div>&nbsp;&nbsp;
             <div className="form-inline">
              <lable className="control-label"> <strong> Source Language </strong> </lable>
                <ListLanguages 
                  Language={this.state.getTargetLanguages}
                  onChange={this.onSelectSource}
                />&nbsp;&nbsp;&nbsp;&nbsp;
              <lable className="control-lable"> <strong> Version </strong> </lable>
                <Versions 
                  version={this.state.getVersions} 
                  onChange={this.onSelectVersion} 
                />&nbsp;&nbsp;&nbsp;&nbsp;
              <lable className="control-lable"> <strong> Revision </strong> </lable>               
                <RevisionNumber
                  revision={this.state.getRevision}  
                  onChange={ (e) => { this.onSelectRevision(e); this.onSelectTargetLanguage(e) } }
                />&nbsp;&nbsp;&nbsp;&nbsp;
              <lable className="control-label"> <strong> Target Language </strong> </lable>
              <ListTargetLanguage
                Tar={this.state.getTargetLangList}
                Language={this.state.getTargetLanguages}
                onChange={ (e) => { this.onSelect(e);this.onSelectBook(e); this.getChartData(e)} }
              />
              </div>
              <div>
                <section style={this.state.getAllBooks === '' ? {display:'none'} : {display: 'inline'} } >
                {(this.state.autoLoad === false)?(this.autoLoad=false):(<Chart 
                  chartData={this.state.chartData}
                  targetlang={this.state.targetlang}
                  location="Bar Chart" legendPosition="bottom"
                />) }
                <Tabs activeTab={this.state.activeTab} />
                <div className="exclude2">{this.createCheckboxes1(this, this.state.getAllBooks, this.state.displayPercentage, this.state.displayTokenCount)}</div>
                <div className="tandc" > * % means how much translation has been completed. Hover over it to view remaining token count.</div>
                </section>
              </div>
                <div className="form-group top5 center-block"> 
                  <button type="button" className="btn btn-success" onClick={this.DowloadDraft} disabled={!this.state.getAllBooks} ><span className="glyphicon glyphicon-download-alt">&nbsp;</span> Download Drafts </button>&nbsp;&nbsp;&nbsp;
                  <button type="button" className="btn btn-success" onClick={this.DowloadRemainingTokens} disabled={!this.state.getAllBooks} ><span className="glyphicon glyphicon-download-alt">&nbsp;</span> Download Remaining Tokens </button>&nbsp;&nbsp;&nbsp;
                </div>
                <div id="loading" className="modal" style={{display: 'none'}}>
                  <div className="center">
                      <img alt="" src={require('./Images/loader.gif')} />
                  </div>
                </div>
          </form>
        </div>
      </div>
      <div>
        <Footer/>
=     </div> 
      </div>
      );
    }
}

export default GetTranslationDraft;
