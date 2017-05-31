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

class GetLanguages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      GetLanguages: []
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
                                    <th className="col-md-4">Languages</th>
                                    {this.state.JSON.parse(GetLanguages[0])}
                                    <th >Versions</th>
                                    {this.state.GetLanguages}
                                </tr>
                            </thead>
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
