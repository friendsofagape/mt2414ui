/**
 * @module src/Translation
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - version: Version of the language
 *  - revision: Autogenerated for each updation of this same source
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import ListTargetLanguage from './Component/ListTargetLanguage';
import Checkbox from './Checkbox';
import booksName2 from './BookName';
import ListLanguages from './Component/ListLanguages'
import Versions from './Component/Versions';
import RevisionNumber from './Component/RevisionNumber';
import VirtualizedSelect from 'react-virtualized-select'


var tabData = [
  { name: 'Include Books', isActive: true },
  { name: 'Exclude Books', isActive: false }
];

//Bookarray for canonical order
var BookArray = ["GEN" : "Genesis", "EXO" : "Exodus", "LEV" : "Leviticus", "NUM" : "Numbers", "DEU" : "Deuteronomy", "JOS" : "Joshua", "JDG" : "Judges", "RUT" : "Ruth", "1SA" : "1 Samuel", "2SA" : "2 Samuel", "1KI" : "1 Kings", "2KI" : "2 Kings", "1CH" : "1 Chronicles", "2CH" : "2 Chronicles", "EZR" : "Ezra", "NEH" : "Nehemiah", "EST" : "Esther", "JOB" : "Job", "PSA" : "Psalms", "PRO" : "Proverbs", "ECC" : "Ecclesiastes", "SNG" : "Songs of Solomon", "ISA" : "Isaiah", "JER" : "Jeremiah", "LAM" : "Lamentations", "EZE" : "Ezekiel", "DAN" : "Daniel", "HOS" : "Hosea", "JOL" : "Joel", "AMO" : "Amos", "OBA" : "Obadiah", "JON" : "Jonah", "MIC" : "Micah", "NAM" : "Nahum", "HAB" : "Habakkuk", "ZEP" : "Zephaniah", "HAG" : "Haggai", "ZEC" : "Zechariah", "MAL" : "Malachi", "MAT" : "Matthew", "MRK" : "Mark", "LUK" : "Luke", "JHN" : "John", "ACT" : "Acts", "ROM" : "Romans", "1CO" : "1 Corinthians", "2CO" : "2 Corinthians", "GAL" : "Galatians", "EPH" : "Ephesians", "PHP" : "Philippians", "COL" : "Colossians", "1TH" : "1 Thessalonians", "2TH" : "2 Thessalonians", "1TI" : "1 Timothy", "2TI" : "2 Timothy", "TIT" : "Titus", "PHM" : "Philemon", "HEB" : "Hebrews", "JAS" : "James", "1PE" : "1 Peter", "2PE" : "2 Peter", "1JN" : "1 John", "2JN" : "2 John", "3JN" : "3 John", "JUD" : "Jude", "REV" : "Revelations"];

class Tabs extends Component {
  render() {
    return (
      <ul className="nav nav-tabs top1">
        {tabData.map(function(tab, i){
          return (
            <Tab 
              key={i} 
              data={tab} 
              isActive={this.props.activeTab === tab} 
              handleClick={this.props.changeTab.bind(this,tab)} 
            />
          );
        }.bind(this))}      
      </ul>
    );
  }
}

class Tab extends Component {
  render() {
    return (
      <li onClick={this.props.handleClick} className={this.props.isActive ? "active" : null}>
        <a href="#">{this.props.data.name}</a>
      </li>
    );
  }
}

class Translation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sourcelang:'',
      version: '',
      revision: '',
      targetlang:'',
      books: [],
      nbooks: [],
      uploaded:'Uploading',
      message: '',
      activeTab: tabData[0],
      activeTabValue: '',
      dataDisplay: 'Include Books',
      getVersions: [],
      getRevision: [],
      Targetlanguage: '',
      getTargetLangList: [''],
      Sourcelanguage: '',
      getAllBooks: '',
      getTargetLanguages: '',
      Tar: '',
      token: '',
      translation: '',
      tokenListState: [],
      myToken: '',
      showhideboolean: true,
      TokenUpdateValue: ''
    }

    // Upload file specific callback handlers
    this.onSelect = this.onSelect.bind(this);
    this.onSelectInput = this.onSelectInput.bind(this);
    this.onSelectSource = this.onSelectSource.bind(this);
    this.onSelectTargetLanguage = this.onSelectTargetLanguage.bind(this);
    this.onSelectVersion = this.onSelectVersion.bind(this);
    this.onSelectRevision = this.onSelectRevision.bind(this);
    this.tokenList = this.tokenList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateTokenTranslation = this.updateTokenTranslation.bind(this);
    this.getConcordances = this.getConcordances.bind(this);
    this.generateConcordances = this.generateConcordances.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.ShowHide = this.ShowHide.bind(this);
  }

  handleClick(tab){
    this.setState({
      activeTab: tab,
      dataDisplay: tab.name
    });
  }

  componentDidMount = () => {
    this.selectedCheckboxes1 = new Set();
    this.selectedCheckboxes2 = new Set();

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

  toggleCheckbox2 = label => {
    if (this.selectedCheckboxes2.has(label)) {
      this.selectedCheckboxes2.delete(label);
    } else {
      this.selectedCheckboxes2.add(label);
    }
  }

//Create cheackbox for the Include Books
  createCheckboxes1 = (obj, books) => (
    Object.keys(books).map(function(v, i){
      return (
        <span key={i} className="disBook">
          <Checkbox
            label={booksName2[0][books[v]]}
            handleCheckboxChange={obj.toggleCheckbox1}
            bookCode={books[v]}
          />
        </span>
      );
    })
  )

//Create the checkbox for the Exclude Books
  createCheckboxes2 = (obj, books) => (
    Object.keys(books).map(function(v, i){
      return (
        <span key={i} className="disBook">
          <Checkbox
            label={booksName2[0][books[v]]}
            handleCheckboxChange={obj.toggleCheckbox2}
            bookCode={books[v]}
          />
        </span>
      );
    })
  )

  //onSelect for Target Language
  onSelect(e) {
    this.setState({ Targetlanguage: e.target.value });
  }
  
  onSelectInput(e) {
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

  //onSelectRevision for Dynamic list of the books
  onSelectRevision(e) {
      this.setState({ Revision: e.target.value });
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      var data = { 
        "language": this.state.Sourcelanguage, "version": this.state.Version, "revision": e.target.value
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

// For Token List
  tokenList(e){
    e.preventDefault();
    global.books = [];
    global.nbooks= [];

    // eslint-disable-next-line
    for (const books of this.selectedCheckboxes1) {
      global.books = Array.from(this.selectedCheckboxes1);

    }
  
    // eslint-disable-next-line
    for (const nbooks of this.selectedCheckboxes2) { 
      global.nbooks = Array.from(this.selectedCheckboxes2);
    }

    var _this = this

    var data = { 
      "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision , "targetlang": this.state.Targetlanguage, "nbooks":global.nbooks, "books": global.books 
    }
    

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

    function beforeSend() {
      document.getElementById("loading").style.display = "inline";
    }

    function complete() {
      document.getElementById("loading").style.display = "none";
    }

    var xhr = new XMLHttpRequest();
    beforeSend();
    xhr.open('POST', GlobalURL["hostURL"]+"/v1/getbookwiseautotokens/false", true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', "bearer " + accessToken);
   
    xhr.onload = function(e) {      
     complete();

      //if status is OK
      if (this.status === 200) {
      	const blb = new Blob([this.response], {type: "text/plain"});
	      const reader = new FileReader();
	      reader.addEventListener('loadend', (e) => {
	        const text = e.srcElement.result;
	        const tokenListfromsever = JSON.parse(text);
	       _this.setState({tokenListState: tokenListfromsever});
	      });
	      reader.readAsText(blb);
      } 

     //if status is failure
     if(this.status === 400){
       	const blb  = new Blob([this.response], {type: "text/plain"});
       	const reader = new FileReader();
       	reader.addEventListener('loadend', (e) => {
  	      const text = e.srcElement.result;
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

//for the updateTokenTranslation API
  updateTokenTranslation(e){
    e.preventDefault();
    var _this = this

    var data = { 
      "sourcelang": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision , "targetlang": this.state.Targetlanguage, "token": this.state.TokenUpdateValue, "translation":this.state.translation
    }

    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

    function beforeSend() {
      document.getElementById("loading").style.display = "inline";
    }

    function complete() {
      document.getElementById("loading").style.display = "none";
    }

    var xhr = new XMLHttpRequest();
    beforeSend();
    xhr.open('POST', GlobalURL["hostURL"]+"/v1/updatetranslation");
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', "bearer " + accessToken);
    xhr.onload = function(e) {
      complete();

     //if status is OK
      if (this.status === 200) {
      	const blb = new Blob([this.response], {type: "text/plain"});
      	const reader = new FileReader();
      	reader.addEventListener('loadend', (e) => {
        const text = e.srcElement.result;
        _this.setState({message: JSON.parse(text)["message"], uploaded: 'success'})
	        setTimeout(function(){
	          _this.setState({uploaded: 'fail'})
	        }, 5000);
     	 });
      	reader.readAsText(blb);
      } 
     if(this.status === 400){
      const blb    = new Blob([this.response], {type: "text/plain"});
      const reader = new FileReader();
      reader.addEventListener('loadend', (e) => {
        const text = e.srcElement.result;
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

//To get concordances for a particular token
  getConcordances(obj){
    this.setState({ TokenUpdateValue: obj });
    var _this = this
    var data = {
      "language": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision, "token": obj
    }
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/getconcordance",
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
        if(result.success !== false){
          _this.setState({myResult: result});
        }else {
           _this.setState({message: result.message, uploaded: 'failure'})
            setTimeout(function(){
              _this.setState({uploaded: 'fail'});
            }, 5000);
          }
      },
      error: function (error) {
        _this.setState({uploaded:'failure'}) 
        setTimeout(function(){
          _this.setState({uploaded: 'fail'});
        }, 5000);
      }
    });      
  }

   ShowHide() {
    var _this = this;
      var x = document.getElementById('bookDiv');
      if (x.style.display === 'none') {
          x.style.display = 'block';
              _this.setState({showhideboolean:false});

      } else {
          x.style.display = 'none';
              _this.setState({showhideboolean:true});

      }
  }

  //Generate Concordance API
  generateConcordances(){
    var _this = this;
    let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    var data = { 
      "language": this.state.Sourcelanguage, "version": this.state.Version, "revision": this.state.Revision
    }
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/generateconcordance",
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
       if(result.success !== false) {
        _this.setState({uploaded: result.success ? 'success' : '', message: result.message})
          setTimeout(function(){
            _this.setState({uploaded: 'fail'})
          },5000);
        }
      },
      error: function (error) {
      }
    });
  }
  
  handleChange(e){
    var _this = this;
    var value = e;
    _this.setState({selectValue: value})
  }

  render() {
	var myTarget = this.state.tokenListState;
  var myjson = this.state.myResult;
    var options = {};
    var myOptions = [];
    var tokenListView = [];

    Object.keys(myTarget).map(function(data, index){
      options = {label: myTarget[data], value: data};
      myOptions.push(options);
      tokenListView.push(myTarget[data]);
      return (myOptions);
    });

    var _this = this; 
    return(
    <div>
      <Header/>
      <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-5 col-md-offset-4">
              <h3> Translation</h3>
            </div>
          </div>

          <div className="row bodyColor">
        		<div className="col-md-3 bodyBorder">
              <div className="row">
                <div className="col-md-12">
                    <label className="control-label"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="glyphicon glyphicon-search">&nbsp; </span>Search Tokens</strong></label>
                    <VirtualizedSelect
                      options={myOptions}/* eslint-disable */ 
                      onChange={ (e) => { this.handleChange(e); this.getConcordances(e["label"]) } }
                      value={this.state.selectValue}
                    />
                </div>
              </div>
                &nbsp; &nbsp; &nbsp;
                  <div className="row">
                    <div className="col-md-12">
                      <table className="table tbodyColor">
                      <thead>
                        <tr>
                          <th>Token List</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Object.keys(tokenListView).map(function(data, index){
                            return (
                              <tr key={index} title="Token List for get Concordances" onClick={_this.getConcordances.bind(this, tokenListView[data])}>
                                <td>
                                  {tokenListView[data]}
                                </td>
                              </tr>
                            );
                           })
                        }
                      </tbody>
                      </table>
                    </div>
                  </div>
            </div>
        	<div className="col-md-9 bodyBorder"> 
            <div className="row"> 
              <div className="col-md-12">       
                  	<form encType="multipart/form-data">
                      <div className={"alert " + (this.state.uploaded === 'success'? 'alert-success msg' : 'invisible')}>
                        <strong>{this.state.message}</strong>
                      </div>&nbsp;&nbsp;
                      <div className={"alert " + (this.state.uploaded === 'failure'? 'alert-danger msg': 'invisible') }>
                        <strong>{this.state.message}</strong>
                      </div>&nbsp;&nbsp;
                      <div className="form-inline">
                        <lable className="control-label"> <strong> Language </strong> </lable>
                          <ListLanguages 
                            onChange={ this.onSelectSource}
                            Language={this.state.getTargetLanguages}
                          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <lable className="control-lable "> <strong> Version </strong> </lable>
                          <Versions 
                            version={this.state.getVersions} 
                            onChange={this.onSelectVersion} 
                          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <lable className="control-lable"> <strong> Revision </strong> </lable>
                          <RevisionNumber
                            revision={this.state.getRevision}  
                            onChange={ (e) => { this.onSelectRevision(e); this.onSelectTargetLanguage(e) } }
                          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <lable className="control-label"> <strong> Target Language *</strong> </lable>
                        <ListTargetLanguage
                          Tar={this.state.getTargetLangList}
                          Language={this.state.getTargetLanguages}
                          onChange={this.onSelect}
                        />
                      </div>

                      <div className="form-group col-md-12 top5 alignCenter">
                          <button type="button" className="btn btn-success" onClick={this.tokenList} disabled={!this.state.Revision} >Generate Tokens</button>&nbsp;
                          {
                            (this.state.showhideboolean)?(<button type="button" className=" btn btn-success" onClick={this.ShowHide} disabled={!this.state.Revision} >Hide Books</button>)
                            :(<button type="button" className=" btn btn-success" onClick={this.ShowHide} >Show Books</button>)
                          }
                      </div>
                      <div className="row" >
                        <div className="col-md-12"  style={this.state.getAllBooks === '' ? {display:'none'} : {display: 'inline'} }>
                          <div className="bgColor" id="bookDiv">
                            <section>
                             <Tabs activeTab={this.state.activeTab}  changeTab={this.handleClick}/>
                              <section className="panel panel-success" style={this.state.dataDisplay === 'Exclude Books' ? {display:'none'} : {display: 'inline'} }>
                                <div className="exclude1" >
                                  {this.createCheckboxes1(this, this.state.getAllBooks)}
                                </div>
                              </section>
                              <section className="panel panel-danger" style={this.state.dataDisplay === 'Include Books' ? {display:'none'} : {display: 'inline'} }>
                                <div className="exclude1">
                                   {this.createCheckboxes2(this, this.state.getAllBooks)}
                                </div>
                              </section>
                              <div> * Optional field. Select <b>Target Language</b> to exclude the Translated Tokens.</div>
                            </section>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                      </div>
                      <div id="loading" className="modal">
                        <div className="center">
                          <img alt="" src={require('./Images/loader.gif')} />
                        </div>
                      </div>
                    </form>
              </div>
            </div>
            <div className="row bodyBorder">
              <div className="col-md-12">
                  <div className="form-inline">
                    <div className="col-md-8">
                      <lable className="control-lable "> <strong>Token </strong> </lable>
                        <input value={this.state.TokenUpdateValue} onChange={this.onSelectInput} name="token" type="text"  placeholder="token" className="form-control"/>
                        <lable className="control-lable "> <strong>Translation </strong> </lable>
                        <input value={this.state.translation} onChange={this.onSelectInput} name="translation" type="text"  placeholder="translation" className="form-control"/>
                      </div>
                      <div className="col-md-4">       
                        <button type="button" className="btn btn-success" onClick={this.updateTokenTranslation} disabled={!this.state.Targetlanguage} >Update</button>
                      </div>
                  </div>
              </div>
            </div>
            <div className="row top1">  
              <div className="col-md-12">
                <div className="top1">
                <button type="button" className=" btn btn-block" title="Generate Concordances" onClick={this.generateConcordances} ><span className="glyphicon glyphicon-refresh"></span></button>
                </div>
                <textarea value={myjson} type="text" id="get_concordances" name="get concordance" placeholder="Get Concordance" className="form-control textarea" />
              </div>  
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
    );
  }
}

export default Translation;