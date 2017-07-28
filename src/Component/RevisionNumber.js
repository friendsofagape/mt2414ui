/**
 * @module src/RevisionNumber
 *
 * Component that display RevisionNumber
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import '../App.css';
import { FormControl } from 'react-bootstrap';

class RevisionNumber extends Component {
  render() {
    var { revision } = this.props;
    return(
        <FormControl componentClass="select" onChange={this.props.onChange} placeholder="select">
            <option>Choose</option>
            {revision.map(function(data, index){
              return (<option key={index} value={data}>{data}</option>);
            })}
        </FormControl> 
        );
    }
}

export default RevisionNumber;
