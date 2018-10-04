import React, { Component } from "react";
import { browserHistory } from 'react-router';
import './view-stylesheet/subforum.css';
import avatar from '../../sampleSubForumIcon/cycle.png'

export default class SubForum extends Component {
  constructor(props){
    super(props);
    this.state = {id:null}
    
  }
  componentDidMount() {
    //Change url in subforum page
    if(this.props.url !== "home")
      browserHistory.push('/subforum');
    
    //Temp add titile id 
    this.setState({id:this.props.id});
    this.title = "Sub Forum "+  String(this.props.id);
  }

  render() {
    return (
      <div className={this.props.url}>
        <button type="button" className="btn btn-link btn-subforum">
          <div className="avatar">
            <img src={avatar} alt="SubForumAvatar"></img>
          </div>
          <div className="title">{this.title}</div>
        </button>
      </div>
    );
  }
}

