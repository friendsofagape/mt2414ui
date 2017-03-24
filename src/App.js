import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import SigninForm from './SigninForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>hello</h1>
        <Header />
        <SigninForm />
        <Footer />
      </div>
    );
  }
}

export default App;
