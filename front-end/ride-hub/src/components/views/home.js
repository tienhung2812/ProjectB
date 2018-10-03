import React, { Component } from "react";
import { browserHistory } from 'react-router';
import './view-stylesheet/home.css'

export default class Home extends Component {
  componentDidMount() {
    browserHistory.push('/');
  }

  render() {
    return (
        <div className="main-content">home</div>
    );
  }
}

