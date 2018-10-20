import React, { Component } from "react";
import {Link as ReactLink} from 'react-router';
import Loader from '../Loader';
import headimg from '../../../recentactivities-bg.jpg'

export default class RecentActivities extends Component {
  constructor(props){
    super(props);
    this.state = {loaded:false,data:null}
    //Props url

  }
  componentDidMount() {
    this.content = [];
    fetch('https://ride-hub.herokuapp.com/api/user/latestactivity')
    .then(response=>{
        if(response.status==200){
            response.json().then(
                data=>this.setState({data:data})
            )
        }else{
            alert('Fetch recent activities fail')
        }
    })
    //sample
    
  }


  render() {

    if(this.content===null){
        this.content = <Loader/>
    }
    if(this.state.data!=null&&!this.state.loaded){
        for(let i=0;i<this.state.data.length;i++){
            this.content.push(
                <div className="child">
                    <ReactLink to={"/UserProfile/"+this.state.data[i].userid}>
                        {'@'+this.state.data[i].username}
                    </ReactLink>
                    {' '+this.state.data[i].tag_activity+' '} <ReactLink to={"/thread/"+this.state.data[i].threadid}>
                        {this.state.data[i].thread_title}
                    </ReactLink>
                </div>
            )
        }
        this.setState({loaded:true})
    }
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

