/**
 * @module src/ListLanguages
 *
 * Component that display SourceDocument
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import '../App.css';
import $ from 'jquery';
import GlobalURL from '../GlobalURL';
import SourceLanguages from '../SourceLanguages';
import { FormControl } from 'react-bootstrap';

class ListLanguages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getLanguages: []
    }
  }

  componentWillMount() {
      var _this = this;
      let accessToken = JSON.parse(window.localStorage.getItem('access_token')) 
      $.ajax({
      url: GlobalURL["hostURL"]+"/v1/language",
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
  }
  
  render() {
    let currentLanguages = this.state.getLanguages;
    return(
          <FormControl onChange={this.props.onChange} componentClass="select" placeholder="select">
            <option>Choose</option>
            {currentLanguages.map(function(data, index){
              return (<option key={index} value={data}>{SourceLanguages[0][data]}</option>);
            })}
          </FormControl>
        );
    }
}

export default ListLanguages;
