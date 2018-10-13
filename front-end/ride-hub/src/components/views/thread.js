import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import TextEditor from './textEditor';
import Post from './post';
import Loader from '../app-components/Loader';
import './view-stylesheet/thread.css';
import defaultimage from '../../defaultimage72x40.jpg'

export default class Thread extends Component {
  constructor(props){
    super(props);
    this.state = {id:null,title:"",child:[],thumbnail:null,tag:null,text:""}
    //Props url
    //home: display in HOMEPAGE
    //subforum: display in SUB-FORUM PAGE
    //null: display in THREAD PAGE
    this.handleChange = this.handleChange.bind(this)
  }

  fetchData(id){
    fetch('https://ride-hub.herokuapp.com/api/thread/'+id)
    .then(response => response.json())
    .then(data => {
      data=data[0];     
      this.setState({
        title:data.title,
        child: JSON.parse("[" + data.child + "]"),
        thumbnail:data.thumbnail,
        tag:data.tag

      })
    });
  }

  componentDidMount() {
    //Set state
    if(this.props.url !== "home" && this.props.url!=="subforum"){
      browserHistory.push('/thread/'+this.props.params.id);
      this.id = this.props.params.id;
    }else{
      this.id = this.props.id;
    }
    this.setState({id:this.id});
    this.fetchData(this.id)
    //Sample
    
    //For display in HOMEPAGE
    
    
  }

  componentDidUpdate(){
    if(this.props.url !== "home" && this.props.url!=="subforum"){
      if(this.state.id!==this.props.params.id){
        browserHistory.push('/thread/'+this.props.params.id);
        this.id = this.props.params.id;
        this.setState({id:this.props.params.id});
        this.fetchData(this.id)
      }
      
    }
  }

  handleChange(value) {
    this.setState({ text: value })
  }
  render() {
    if (this.props.url==="home"){
      //For display short type
      return(
      <div className="thread"> 
        <ReactLink to={'/thread/'+this.props.id} style={{textDecoration:"none !important"}}>
        <button type="button" className="btn btn-link btn-thread">
          <div className="threadImage">
              <img src={defaultimage} alt="SubForumAvatar"></img>
          </div>
          <div className="title">
              {this.state.title}
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
    
    if(this.state.child.length===0){
      this.childcontent = <Loader/>
    }else{
      //OP 
      var originalPost = <Post type = "original-post" postID={this.state.child[0]}/>
      //Comment
      var comments = []
      for(var i = 1; i<this.state.child.length;i++){
        comments.push(<Post type = "comment-post" postID={this.state.child[i]}/>)
      }


      //Child Content
      this.childcontent=
      <div className="post-wrapper">
        <div className="original-post-wrapper">
          {originalPost}
        </div>
        <div className="comment-post-wrapper">
          <div className="add-comment-wrapper">
          <TextEditor type="comment"/>
          </div>
          <div className="comments">
            {comments}
          </div>
        </div>
        <div className="blank"></div>
      </div>
    }
    

    return(
      //For display full page
      <div className="main-thread-content">
          <div className="title-wrapper">
            <div className="title">
              <div className="thread-title">
                {this.state.title}
              </div>
              <div className="thread-tag needhelp-tag">
                {this.state.tag}
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

