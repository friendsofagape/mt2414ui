import {Component} from 'react';
import { browserHistory } from 'react-router';

class LogOut extends Component {  
  render() {
  	window.localStorage.clear();
  	browserHistory.replace('/homepage');
  	window.location.href = "./homepage";
    return(null);
  }
}

export default LogOut;