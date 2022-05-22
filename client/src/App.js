import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Accounts from "./Account"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>"Loading..."</p>
        </header>
        <Accounts />
      </div>
    );
  }
}

export default App;
