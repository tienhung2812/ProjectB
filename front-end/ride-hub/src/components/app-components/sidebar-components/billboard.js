import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';
import Loader from '../Loader';
import headimg from '../../../billboard-bg.jpg'

export default class Billboard extends Component {
  constructor(props){
    super(props);
    this.state = {threadID:null,postID:null,likeStatus:false}
    //Props url

  }
  componentDidMount() {
    this.content = []

    for(var i=0; i <3 ; i++){
        this.content.push(
            <div className="child">
                <div className="order">
                    {"#"+(i+1)}
                </div>
                <div className="username">
                    <ReactLink to={"/user/username"}>
                        @username
                    </ReactLink>
                </div>
                <div className="point">
                    {((10-i)*100)+" pts"}
                </div>
            </div>
        )
    }
    
  }


  render() {
    if(this.content===null){
        this.content = <Loader/>
    }

    return(
    <div className="billboard wrapper">
        <div className="head-img">
            <img src={headimg} alt="headimg"></img>
        </div>
        <div className="content-wrapper">
            <div className="title">
               Billboard
            </div>
            <div className="content">
                {this.content}
            </div>
        </div>
    </div>);
      
  }
}

