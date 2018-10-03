import React, { Component } from 'react';
import Header from './app-components/Header';
import Sidebar from './app-components/Sidebar';
import './stylesheet/App.css';

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
            <div id="main" className="main">
              {this.props.children}
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
