import React, { Component } from "react";
import { browserHistory } from 'react-router';
import SubForum from './subforum';
import loadingGif from '../../loading.gif';
import './view-stylesheet/home.css'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.loader = <div className="loader"><img src={loadingGif} alt="loader"></img></div>
    
    //Generate number of thread
    this.content = <div className="subforum-main">
                    <SubForum id={1} url="home" parent_id={0}/>
                    <SubForum id={2} url="home" parent_id={0}/>
                    <SubForum id={3} url="home" parent_id={0}/>
                    <SubForum id={4} url="home" parent_id={0}/>
                  </div>;
    
  }
  componentDidMount() {
    browserHistory.push('/');
  }

  render() {
    return (
        <div className="main-content">{this.content}</div>
    );
  }
}

