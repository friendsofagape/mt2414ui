/**
 * @module src/GetLanguages
 *
 * Component that display SourceDocument
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import BookName from './BookName';

//Bookarray for canonical order
var BookArray = ["GEN" : "Genesis", "EXO" : "Exodus", "LEV" : "Leviticus", "NUM" : "Numbers", "DEU" : "Deuteronomy", "JOS" : "Joshua", "JDG" : "Judges", "RUT" : "Ruth", "1SA" : "1 Samuel", "2SA" : "2 Samuel", "1KI" : "1 Kings", "2KI" : "2 Kings", "1CH" : "1 Chronicles", "2CH" : "2 Chronicles", "EZR" : "Ezra", "NEH" : "Nehemiah", "EST" : "Esther", "JOB" : "Job", "PSA" : "Psalms", "PRO" : "Proverbs", "ECC" : "Ecclesiastes", "SNG" : "Songs of Solomon", "ISA" : "Isaiah", "JER" : "Jeremiah", "LAM" : "Lamentations", "EZE" : "Ezekiel", "DAN" : "Daniel", "HOS" : "Hosea", "JOL" : "Joel", "AMO" : "Amos", "OBA" : "Obadiah", "JON" : "Jonah", "MIC" : "Micah", "NAM" : "Nahum", "HAB" : "Habakkuk", "ZEP" : "Zephaniah", "HAG" : "Haggai", "ZEC" : "Zechariah", "MAL" : "Malachi", "MAT" : "Matthew", "MRK" : "Mark", "LUK" : "Luke", "JHN" : "John", "ACT" : "Acts", "ROM" : "Romans", "1CO" : "1 Corinthians", "2CO" : "2 Corinthians", "GAL" : "Galatians", "EPH" : "Ephesians", "PHP" : "Philippians", "COL" : "Colossians", "1TH" : "1 Thessalonians", "2TH" : "2 Thessalonians", "1TI" : "1 Timothy", "2TI" : "2 Timothy", "TIT" : "Titus", "PHM" : "Philemon", "HEB" : "Hebrews", "JAS" : "James", "1PE" : "1 Peter", "2PE" : "2 Peter", "1JN" : "1 John", "2JN" : "2 John", "3JN" : "3 John", "JUD" : "Jude", "REV" : "Revelations"];

class GetLanguages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getLanguages: '',
      getBooks: '',
      language: '',
      version: '',
      getTargetLanguages: ''
    }
      // Upload file specific callback handlers
      this.getBooks = this.getBooks.bind(this);
      this.onSelect = this.onSelect.bind(this);
  }
  
  componentDidMount() {
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/get_languages",
      contentType: "application/json; charset=utf-8",
      method : "POST",
      headers: {
                "Authorization": "bearer " + accessToken
      },
      success: function (result) {
        var getLang = JSON.parse(result);
        _this.setState({getLanguages: getLang.length > 0 ? getLang : []})
      },
      error: function (error) {
      }
    });

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

  onSelect(){
    $('#data tr').click(function(e) {
      $('#data tr').removeClass('highlight');
      $(this).addClass('highlight');
    });
  }

  getBooks(obj){        
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    var _this = this;
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/get_books",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(obj),
      method : "POST",
      headers: {
        "Authorization": "bearer " + accessToken
      },
      success: function (result) {

        var getBook = JSON.parse(result);
        _this.setState({getBooks: getBook.length > 0 ? getBook : []})

      },
      error: function (error) {
      }
    });     
  }

  
  render() {
    let currentLanguages = this.state.getLanguages.length > 0 ?  this.state.getLanguages : [];
    let currentBooks = this.state.getBooks.length > 0 ?  this.state.getBooks : [];

    var ListofLanguage = this.state.getTargetLanguages;
    
    var LanguagesWithCode = [];
    if(ListofLanguage != null){
      Object.keys(ListofLanguage).map(function(data, index){
        for(var i=0; i<currentLanguages.length; i++){
          if(ListofLanguage[data]  === currentLanguages[i][0]){
            LanguagesWithCode[data] = currentLanguages[i][1];
          }
        }
        return null;
      })
    }

    var booksCollection = {}
    for (var i = 0; i < BookArray.length; i++) {
      for( var j = 0; j < currentBooks.length; j++) {
          if(BookArray[i] === currentBooks[j][0]){
            booksCollection[currentBooks[j][0]] = currentBooks[j][1];
          }
        }
      }

    var _this = this; 
    return(
      <div>
        <Header/>
      <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Available Source Texts</h3>
            </div>
          </div>

        <div className="row">
          <div className="col-md-12 col-md-offset-1">
            <form encType="multipart/form-data">
              <div className="col-md-5 divSpaceGetLang bodyBorder bodyColor  alignCenter">
                <table className="table" id="data" onClick={_this.onSelect} >
                  <thead>
                    <tr>
                      <th>Language</th>
                      <th>Versions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(LanguagesWithCode).map(function(data, index){
                        return (
                          <tr key={index} title="Show Books" onClick={_this.getBooks.bind(this, {"language": ListofLanguage[data], "version": LanguagesWithCode[data]})} >
                            <td>
                              {data}
                            </td>
                            <td>
                              {LanguagesWithCode[data]}
                            </td>
                          </tr>
                         );
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="col-md-5 bodyColor  bodyBorder alignCenter divSpaceGetLang">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Revision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(booksCollection).map(function(key, index){
                        return(
                          <tr key={index}>
                            <td>
                              {BookName[0][key]}
                            </td>
                            <td>
                              {booksCollection[key]}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>

      </div> 
        <Footer/>
      </div>
      );
    }
}

export default GetLanguages;
