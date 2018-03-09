import React, { Component } from 'react';
import HeaderforSuperAdmin from './HeaderforSuperAdmin';
import HeaderforAdmin from './HeaderforAdmin';
import HeaderforMember from './HeaderforMember';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
var jwtDecode = require('jwt-decode');

let accessToken = JSON.parse(window.localStorage.getItem('access_token'))
if(accessToken){
  var decoded = jwtDecode(accessToken);
}

class Header extends Component {
  render() {
    return (
      <div>
      {
        (accessToken && decoded.role === 'superadmin') ? ( <HeaderforSuperAdmin /> ) : (

          (accessToken && decoded.role === 'admin') ? ( <HeaderforAdmin />) : (

            (accessToken && decoded.role === 'member') ?( <HeaderforMember />) : (
              <Route path="/" component={HomePage} />
            )
          )
        ) 
      }
      </div>
    );
  }
}

export default Header;