import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class Home extends Component {
  componentDidMount() {
    browserHistory.push('/');
  }

  render() {
    return (
      <Header></Header>
    );
  }
}

class Header extends Component{
  render(){
    return (
      <div className="header-wrapper">
        <div className="header">
          <div className="header-content">
            <div className="logo">
              <div className="logp-image">
                <img src="" alt="logo"></img>
              </div>
              <div className="logo-name">
                <h1>Scooter Ask</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}