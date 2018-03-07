import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component{
 render(){
   return (
     <div className="footer">
      <Link to="/">
       <strong className="scolor">Contact us: autographamt@gmail.com</strong>
      </Link>
     </div>
    );
 }
}

export default Footer;