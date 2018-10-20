import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';

export default class Credit extends Component {
  constructor(props){
    super(props);
    this.state = {threadID:null,postID:null,likeStatus:false}
    //Props url

  }
  componentDidMount() {


    
  }


  render() {
    return(<div className="credit wrapper"> 
      <div className="content">
      <ReactLink to={'/termsandpolicies'}>Terms and Policies</ReactLink>
      <br/>
      © 2018 <ReactLink to={'/aboutus'}>RideHub, Inc. </ReactLink>
      <br/>
      All rights reserved
        {/* © 2018 Ridehub. All Rights Reserved. */}
      </div>
      
    </div>);
      
  }
}

