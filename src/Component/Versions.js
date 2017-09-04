/**
 * @module src/Versions
 *
 * Component that display SourceDocument
 * Accepts the only authentication token in header
*/

import React, { Component } from 'react';
import '../App.css';
import { FormControl } from 'react-bootstrap';

class Versions extends Component {

  render() {
    var { version } = this.props;
    return(
          <FormControl componentClass="select" onChange={this.props.onChange} placeholder="select">
            <option>Choose</option>
            {
              version.map(function(data, index){
                return (<option key={index} value={data}>{data}</option>);
              })
            }
          </FormControl>
        );
    }
}

export default Versions;
