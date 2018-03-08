import React from 'react';
import { createHashHistory } from 'history';

class LogOut extends React.Component {  
  render() {
  	const history = createHashHistory();
  	window.localStorage.clear();
  	this.props.history.push('/')
  	window.location.href = "./";
    return(null);
  }
}

export default LogOut;