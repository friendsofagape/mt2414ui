/**
 * @module src/ListTargetLanguage
 *
 * Component that display SourceDocument
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import '../App.css';
import { FormControl } from 'react-bootstrap';
import  TargetLanguages from '../TargetLanguages';

class ListTargetLanguage extends Component {

  render() {
    var { Targetlanguage } = this.props;
    return(
          <FormControl componentClass="select" onChange={this.props.onChange} placeholder="select">
            <option>Choose</option>
            {Targetlanguage.map(function(data, index){
              return (<option key={index} value={data}>{TargetLanguages[0][data]}</option>);
            })}
          </FormControl>
        );
    }
}

export default ListTargetLanguage;