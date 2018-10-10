import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';
import headimg from '../../../recentactivities-bg.jpg'

export default class RecentActivities extends Component {
  constructor(props){
    super(props);
    this.state = {threadID:null,postID:null,likeStatus:false}
    //Props url

  }
  componentDidMount() {

    this.content = [];
    this.content.push(
        <div className="child">
            <ReactLink to={"/user/ablacuta"}>
                @username1
            </ReactLink>
            voted <ReactLink to={"/post/330"}>
                Thread 330
            </ReactLink>
        </div>
    )
    this.content.push(
        <div className="child">
            <ReactLink to={"/user/ablacuta"}>
                @username2
            </ReactLink>
            comment on <ReactLink to={"/post/330"}>
                Thread 330
            </ReactLink>
        </div>
    )
    this.content.push(
        <div className="child">
            <ReactLink to={"/user/ablacuta"}>
                @username3
            </ReactLink>
            voted <ReactLink to={"/post/330"}>
                Thread 330
            </ReactLink>
        </div>
    )

    
  }


  render() {
    return(
    <div className="recentactivities wrapper">
        <div className="head-img">
            <img src={headimg} alt="headimg"></img>
        </div>
        <div className="content-wrapper">
            <div className="title">
                Recent Activities
            </div>
            <div className="content">
                {this.content}
            </div>
        </div>
    </div>
    );
      
  }
}

