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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

class GetLanguages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getLanguages: [],
      getVersions: []
    }
      // Upload file specific callback handlers
      this.getLanguages = this.getLanguages.bind(this);
      this.onSelect = this.onSelect.bind(this);
  }
  
  onSelect(e) {
    this.setState({
      [e.target.name]: e.target.value });
  }

  getLanguages(e){
    e.preventDefault();
    let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
    var _this = this;
    $.ajax({
      url: "http://127.0.0.1:8000/v1/get_languages",
      contentType: "application/json; charset=utf-8",
      method : "POST",
      headers: {
                "Authorization": "bearer " + JSON.stringify(accessToken['access_token']).slice(1,-1)},
      success: function (result) {
        var getLang = JSON.parse(result);
        for (var i = 0; i < getLang.length; i++) {
        var getLang1 = getLang[i];
        _this.state.getLanguages.push(getLang1[0]+ " ")
        _this.state.getVersions.push(getLang1[1]+ " ")
        }

       _this.setState({GetLanguages: result})
      },
      error: function (error) {
        console.log("Sources Uploaded failure !!!")
      }
    });   
    
  }

  render() {
    return(
      <div className="container">
        <Header/ >
        <div className="col-xs-12 col-md-6 col-md-offset-3">
          <form className="col-md-8 uploader" encType="multipart/form-data">
            <h1 className="source-header">Get Languages</h1>&nbsp;
              <div className="form-group">
                <button id="button" type="button" className="btn btn-success sourcefooter" onClick={this.getLanguages}>Get Languages</button>&nbsp;&nbsp;&nbsp;
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Languages</th>
                        <th >Versions</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>{this.state.getLanguages}</td>
                    <td>{this.state.getVersions}</td>
                    </tbody>
                  </table>
                </div>
              </div>
          </form>
        </div>
        <Footer/>
      </div>
      );
    }
}

export default GetLanguages;
