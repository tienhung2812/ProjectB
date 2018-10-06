import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import './view-stylesheet/thread.css';
import defaultimage from '../../defaultimage72x40.jpg'

export default class Thread extends Component {
  constructor(props){
    super(props);
    this.state = {id:null}
    //Props url
    //home: display in HOMEPAGE
    //subforum: display in SUB-FORUM PAGE
    //null: display in THREAD PAGE
  }
  componentDidMount() {
    //Set state
    if(this.props.url !== "home" && this.props.url!=="subforum"){
      browserHistory.push('/thread/'+this.props.params.id);
      this.id = this.props.params.id;
      this.setState({id:this.props.params.id});
    }else{
      this.id = this.props.id;
      this.setState({id:this.props.id})
    }
      

    //Sample
    this.title = "Thread "+ String(this.id)
    //For display in HOMEPAGE
    
    
  }

  render() {
    if (this.props.url==="home"){
      return(
      <div className="thread"> 
        <ReactLink to={'/thread/'+this.props.id}>
        <button type="button" className="btn btn-link btn-thread">
          <div className="threadImage">
              <img src={defaultimage} alt="SubForumAvatar"></img>
          </div>
          <div className="title">
              {this.title}
          </div>
          <div className="status">
            <div className="username">
              username
            </div>
            <div className="view-reply-wrapper">
              <div className="view">
                100 views
              </div>
              <div className="reply">
                1000 replies
              </div>
            </div>
          </div>
          </button>
        </ReactLink>
          
      </div>
      );
  }else{
    return(
      <div></div>
    );
  }
  }
}

