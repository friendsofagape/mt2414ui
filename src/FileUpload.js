import React, { Component } from 'react';
import $ from 'jquery';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.uploadFile = this.uploadFile.bind(this);
  }
    uploadFile(e){
        var fd = new FormData();    
        fd.append('file', this.refs.files[0]);

        $.ajax({
            url: 'https://api.mt2414.in/v1/sources',
            data: fd,
            type: 'POST',
            success: function(data){
              console.log("Successfully Uploaded");
                alert(data);
            },
            error: function(error){
              console.log("error in uploading");
              console.log(error);
             }

        });
        e.preventDefault()
    }
    render(){
        return (
            <div className="App text-center">                
               <form ref="uploadForm" className="uploader col-md-8" encType="multipart/form-data" >
                  <div className="form-goup">
                      <input 
                        ref="file"
                        type="file" 
                        name="file"
                        className="upload-file"
                      />
                      <input 
                        type="button"
                        ref="button" 
                        value="Upload" 
                        onClick={this.uploadFile} 
                      />
                  </div> 
               </form>                
            </div>
        );
    }
}

export default FileUpload;