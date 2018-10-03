import React, { Component } from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Sidebar from './components/Sidebar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <div className="content">
            <Header/>
          </div>
        </div>
        <div className="body">
          <div className="content">
            <div className="main">
              <Main/>
            </div>
            <div className="sidebar">
              <Sidebar/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
