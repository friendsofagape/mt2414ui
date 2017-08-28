/**
 * @module src/ListTargetLanguage
 *
 * Component that display SourceDocument
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import '../App.css';
import { FormControl } from 'react-bootstrap';

class ListTargetLanguage extends Component {

  render() {
    var { Tar } = this.props;
    var { Language } = this.props;

    var LanguagesWithCode = [];
    if(Language != null){
        Object.keys(Language).map(function(data, index){
        for(var i=0; i<Tar.length;i++){
          if(Language[data] === Tar[i]){
            LanguagesWithCode[Tar[i]] = data;
          }
        }
        return (<h1>{null}</h1>);
      })
    }

    return(
          <FormControl componentClass="select" onChange={this.props.onChange} placeholder="select">
            <option>Choose</option>
            {
              Object.keys(LanguagesWithCode).map(function(data, index){
                return(<option key={index} value={data}>{LanguagesWithCode[data]}</option>);
              })
            }
          </FormControl>
        );
    }
}

export default ListTargetLanguage;