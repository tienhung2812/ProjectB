import React, { Component } from "react";
import { browserHistory } from 'react-router';
import './view-stylesheet/thread.css';
import avatar from '../../sampleSubForumIcon/cycle.png'

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
    this.setState({id:this.props.id})

    if(this.props.url !== "home")
      browserHistory.push('/post/'+this.props.id);

    //Sample
    this.title = "Post "+ String(this.props.id);

    //For display in HOMEPAGE
    if (this.props.url==="home"){
        this.content = <div className="thread"> 
                            <button type="button" className="btn btn-link btn-thread">
                            <div className="avatar">
                                <img src={avatar} alt="SubForumAvatar"></img>
                            </div>
                            <div className="title">
                                {this.title}
                            </div>
                            </button>
                        </div>
    }
    
  }

  render() {
    return (
      <div>
          {this.content}
      </div>
    );
  }
}

