import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';
import headimg from '../../../newestthread-bg.jpg';
import Loader from '../Loader';

export default class NewestThread extends Component {
  constructor(props){
    super(props);
    this.state = {data:null,loaded:false}
    //Props url

  }
  componentDidMount() {
    this.newestpost=[1030,40203,40240]
    fetch('https://ride-hub.herokuapp.com/api/thread/latest')
    .then(response => {
        if(response.status===200){
            response.json().then(
                data=>{
                    this.setState({data:data})
                }
            )
        }else{
            console.log("Load newest thread error: "+response.status)
        }
    });
   
    this.content = []
    
  }


  render() {
    if(this.state.data!=null&&!this.state.loaded){
        for (var i = 0; i < this.state.data.length; i++){
            this.content.push(
                <div className="child">
                    <ReactLink to={'/thread/'+this.state.data[i].t_id}>
                        {"Thread "+this.state.data[i].t_title}
                    </ReactLink>
                </div>
                
            )
        }
        this.setState({loaded:true})
    }

    if(this.content==null){
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

