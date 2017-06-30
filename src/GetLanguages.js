/**
 * @module src/GetLanguages
 *
 * Component that display SourceDocument
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';
import GlobalURL from './GlobalURL';
import SourceLanguages from './SourceLanguages';
import BookName from './BookName';

class GetLanguages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getLanguages: '',
      getBooks: '',
      language: '',
      version: ''
    }
      // Upload file specific callback handlers
      this.getLanguages = this.getLanguages.bind(this);
      this.getBooks = this.getBooks.bind(this);
  }
  
  componentWillMount() {
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/get_languages",
      contentType: "application/json; charset=utf-8",
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      success: function (result) {
        var getLang = JSON.parse(result);
        _this.setState({getLanguages: getLang.length > 0 ? getLang : []})
      },
      error: function (error) {
      }
    });
  }
  
  getLanguages(e){
    e.preventDefault();
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
    
    var _this = this;
    $.ajax({
      url: GlobalURL["hostURL"]+"/v1/get_languages",
      contentType: "application/json; charset=utf-8",
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      success: function (result) {
        var getLang = JSON.parse(result);
        _this.setState({getLanguages: getLang.length > 0 ? getLang : []})
      },
      error: function (error) {

      }
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
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
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

    var _this = this;
    return(
      <div className="container">
        <Header/ >
          <h1 className="source-header-lan">Available Source Texts</h1>&nbsp;
          <form className="col-md-6 uploader getLangCustom" encType="multipart/form-data">
            <div className="container">
            <div className="floatLeft">
              <table className="table">
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Versions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLanguages.map(function(data, index){
                    return (<tr key={index}><td>{SourceLanguages[0][data[0]]}</td><td>{data[1]}</td>
                            <td><a href="#" data-language={data[0]} data-version={data[1]} onClick={_this.getBooks.bind(this, {"language": data[0], "version": data[1]})} className="customLink">Show Books</a></td>
                            </tr>
                            );
                  })}
                </tbody>
              </table>
            </div>
            <div className="floatRight">
              <table className="table">
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Revision</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBooks.map(function(data, index){
                    return (<tr key={index}><td>{BookName[0][data[0]]}</td><td>{data[1]}</td></tr>);
                  })}
                </tbody>
              </table>
            </div>
          </div>
          </form>
        <Footer/>
      </div>
      );
    }
}

export default GetLanguages;
