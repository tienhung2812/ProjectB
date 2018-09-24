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
      <div class="header-wrapper">
        <div class="header">
          <div class="header-content">
            This is the content od Header
          </div>
        </div>
      </div>
    )
  }
}