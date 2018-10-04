import React, { Component } from "react";
import { browserHistory } from 'react-router';
import './view-stylesheet/subforum.css';

export default class SubForum extends Component {
  constructor(props){
    super(props);
    this.state = {id:null}
  }
  componentDidMount() {
    if(this.props.url !== "home")
      browserHistory.push('/channel');
  }

  render() {
    return (
      <div className={this.props.url}>
        <div className="title">Sub Forum {this.state.id}</div>
      </div>
    );
  }
}

