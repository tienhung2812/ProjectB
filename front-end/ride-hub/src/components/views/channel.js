import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class Channel extends Component {
  componentDidMount() {
    browserHistory.push('/channel');
  }

  render() {
    return (
      <div>channel</div>
    );
  }
}

