import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';
import Loader from '../Loader';
import headimg from '../../../billboard-bg.jpg'

export default class Billboard extends Component {
  constructor(props){
    super(props);
    this.state = {data:null,loaded:false}
    //Props url

  }
  componentDidMount() {
    this.content = []
    fetch('https://ride-hub.herokuapp.com/api/user/billboard')
    .then(response => {
        if(response.status===200){
            response.json().then(
                data=>{
                    this.setState({data:data})
                }
            )
        }else{
            console.log("Load billboard error: "+response.status)
        }
    });
  }

  

  render() {
    if(this.state.data!=null&&!this.state.loaded){
        for(var i=0; i <3 ; i++){
            this.content.push(
                <div className="child">
                    <div className="order">
                        {"#"+(i+1)}
                    </div>
                    <div className="username">
                        <ReactLink to={"/UserProfile/"+this.state.data[i].id}>
                            {'@'+this.state.data[i].username}
                        </ReactLink>
                    </div>
                    <div className="point">
                        {this.state.data[i].point+" pts"}
                    </div>
                </div>
            )
        }
        this.setState({loaded:true})
    }

    if(this.content==null){
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

