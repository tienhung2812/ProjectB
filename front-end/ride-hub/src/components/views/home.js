import React, { Component } from "react";
import { browserHistory } from 'react-router';
import SubForum from './subforum';
import Loader from '../app-components/Loader';
import loadingGif from '../../loading.gif';
import './view-stylesheet/home.css'

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={subforumData:[]}
    this.loader = <div className="loader"><img src={loadingGif} alt="loader"></img></div>
    
    //Generate number of thread

    
  }
  componentDidMount() {
    browserHistory.push('/');
    //fetch data
    fetch('http://ride-hub.herokuapp.com/api/subforum/root')
    .then(response => response.json())
    .then(data => {
      var idData=[]
      this.setState({fecthData:true})
      for(var i=0;i<data.length;i++){
        idData.push(data[i].id)
      }
      this.setState({subforumData:idData})
    });
  }

  render() {
    if(this.state.subforumData.length===0){
      this.child = <Loader/>
    }else{
      this.child = [];
      for(var i=0;i<this.state.subforumData.length;i++){
        this.child.push(<SubForum id={this.state.subforumData[i]} url="home" parent_id={0}/>)
      }
    }
    return (
        <div className="main-content">
          <div className="subforum-main">
            {this.child}  
          </div>
        </div>
    );
  }
}

