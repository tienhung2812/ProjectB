import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';
import headimg from '../../../newestthread-bg.jpg';
import Loader from '../Loader';

export default class NewestThread extends Component {
  constructor(props){
    super(props);
    this.state = {threadID:null,postID:null,likeStatus:false}
    //Props url

  }
  componentDidMount() {
    this.newestpost=[1030,40203,40240]

    this.content = []
    for (var i = 0; i < this.newestpost.length; i++){
        this.content.push(
            <div className="child">
                <ReactLink to={'/thread/'+this.newestpost[i]}>
                    {"Thread "+this.newestpost[i]}
                </ReactLink>
            </div>
            
        )
    }
  }


  render() {
    if(this.content===null){
        this.content= <Loader/>
    }

    return(
    <div className="newestthread wrapper">
        <div className="head-img">
            <img src={headimg} alt="headimg"></img>
        </div>
        <div className="content-wrapper">
            <div className="title">
                Newest Thread
            </div>
            <div className="content">
                {this.content}
            </div>
        </div>
    </div>
    );
      
  }
}

