import React, { Component } from 'react';
import HeaderforSuperAdmin from './Component/HeaderforSuperAdmin';
import HeaderforAdmin from './Component/HeaderforAdmin';
import HeaderforMember from './Component/HeaderforMember';
import {Route } from 'react-router';
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

            (accessToken && decoded.role === 'member') ?( < HeaderforMember />) : (
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