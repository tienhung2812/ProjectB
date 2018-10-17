import React, { Component } from "react";


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
        Designed and Developed <br/>
        by Ridehub © 2018.
        {/* © 2018 Ridehub. All Rights Reserved. */}
      </div>
      
    </div>);
      
  }
}

