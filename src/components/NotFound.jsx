import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {  
  render() {
    window.localStorage.clear();
    return (
      <div className="container Notfound">
        <h2>We are sorry but the page you are looking for does not exist.</h2>
        <div>
          <img alt="" src={require('../images/Notfound.jpg')} />
        </div>
        <Link to={'/'} className="customLink"><h3>Back to Home Page</h3></Link>
      </div>
    );
  }
}


export default NotFound;