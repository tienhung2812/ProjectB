import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import TextEditor from './textEditor';
import Post from './post';
import './view-stylesheet/thread.css';
import defaultimage from '../../defaultimage72x40.jpg'

export default class Thread extends Component {
  constructor(props){
    super(props);
    this.state = {id:0,title:""}
    //Props url
    //home: display in HOMEPAGE
    //subforum: display in SUB-FORUM PAGE
    //null: display in THREAD PAGE
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    //Set state
    if(this.props.url !== "home" && this.props.url!=="subforum"){
      browserHistory.push('/thread/'+this.props.params.id);
      this.id = this.props.params.id;
    }else{
      this.id = this.props.id;
    }
    this.title = "Thread "+ String(this.id);
    this.setState({id:this.id,title:this.title});

    //Sample
    
    //For display in HOMEPAGE
    
    
  }

  componentDidUpdate(){
    if(this.props.url !== "home" && this.props.url!=="subforum"){
      if(this.state.id!==this.props.params.id){
        browserHistory.push('/thread/'+this.props.params.id);
        this.id = this.props.params.id;
        this.title = "Thread "+ String(this.id);
        this.setState({id:this.props.params.id,title:this.title});
      }
      
    }
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  render() {
    if (this.props.url==="home"){
      return(
      <div className="thread"> 
        <ReactLink to={'/thread/'+this.props.id} style={{textDecoration:"none !important"}}>
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
    //Child Content
    this.childcontent=
      <div className="post-wrapper">
        <div className="original-post-wrapper">
          <Post type = "original-post" threadId={this.id}/>
        </div>
        <div className="comment-post-wrapper">
          <div className="add-comment-wrapper">
          <TextEditor type="comment"/>
          </div>
          <div className="comments">
            <Post type = "comment-post" threadId={this.id}/>
          </div>
        </div>
        <div className="blank"></div>
      </div>

    return(
      <div className="main-thread-content">
          <div className="title-wrapper">
            <div className="title">
              <div className="thread-title">
                {this.state.title}
              </div>
              <div className="thread-tag needhelp-tag">
                need help
              </div>
            </div>
            <div className="thread-image">
              <img src={defaultimage} alt="threadImage"></img>
            </div>
          </div>
          <div className="content-wrapper">
            {this.childcontent}
          </div>
      </div>
    );
  }
  }
}

