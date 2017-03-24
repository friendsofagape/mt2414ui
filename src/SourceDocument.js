/**
 * @module src/SourceDocument
 *
 * Component that display SourceDocument
 * Accepts the following properties:
 *  - language: Ethnologue code of the language
 *  - content: Content of all the source documents stored
 *  - Access ID & Key: Returned as a response after authentication
*/

import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { FormControl } from 'react-bootstrap';
import FileUpload from './FileUpload';

class SourceDocument extends Component {
    render() {
      return (
        <div className="App text-center">
          <Header/ >
          <form className="col-md-8">
              <h1>Source</h1>
              <div className="form-goup">
                <lable className="control-lable">Language Name</lable>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="other">Tamil</option>
                    <option value="other">Hindi</option>
                    <option value="other">English</option>
                    <option value="other">Gujrati</option>
                    <option value="other">Bengali</option>
                    <option value="other">Marathi</option>
                    <option value="other">Sanskrit</option>
                  </FormControl>
              </div>
              <div className="form-goup">
                <lable className="control-lable">Ethnologue Code</lable>
                  <input
                    value=""
                    type="text"
                    name="ethnologue code"
                    placeholder="tam"
                    className="form-control"
                  />
              </div>
              <div className="form-goup">
                <lable className="control-lable">Translation Version </lable>
                  <input
                    value=""
                    type="text"
                    name="translation version"
                    placeholder="ULB"
                    className="form-control"
                  />     
              </div>
              <FileUpload />
          </form>
        <Footer/>
      </div>
      );
    }
}
export default SourceDocument;
