import React, { Component } from 'react';
import SignupForm from './SignupForm';
import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
        </div>
        <Header />
        <SignupForm />
        <Footer />
      </div>
    );
  }
}

export default App;
