import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import './view-stylesheet/subforum.css';
import avatar from '../../sampleSubForumIcon/cycle.png'
import Thread from './thread';
export default class SubForum extends Component {
  constructor(props){
    super(props);
    this.state = {id:null, type:0}
    //ID: Sub Forum ID
    //Type: 0 sub forum have child
    //Type: 1 sub forum does not have child

    //Props url
    //home: display in HOMEPAGE as parent_id == 0
    //subsubforum: display in HOMEPAGE as subsub forum
    //null: display in SUB-FORUM PAGE
    //subsubforum-sub: display in SUB-FORUM PAGE
  }
  componentDidMount() {
    this.id = null;

    //WILL DELETE
    if(this.props.url!=="subsubforum")
      this.title = "Sub Forum ";
    else
      this.title = "Sub sub Forum";

    //Change url in subforum page
    if(this.props.url !== "home" && this.props.url !=="subsubforum"){
      browserHistory.push('/subforum/'+this.props.params.id);
      this.id = this.props.params.id;
    }else{
      this.id = this.props.id;
      //Content for parent_id == 0 
      if (this.props.parent_id === 0){
        //Sepereate type
        if(this.state.type===0){
          //This is example before having API, this section will be deleted after done API
          //Generate some sub sub Forum
          this.childcontent = <div className="subsubforum-wrapper">
                              <SubForum id={34535} url="subsubforum" parent_id={this.id}/>
                              <SubForum id={123414} url="subsubforum" parent_id={this.id}/>
                              <SubForum id={15135254} url="subsubforum" parent_id={this.id}/>
                            </div>
          //Sub Forum have child
        }else{
          //This is example before having API, this section will be deleted after done API
          //Generate some thread
          this.childcontent = <div className="subsubforum-wrapper">
                              <Thread id={132456} url="home"/>
                              <Thread id={132456} url="home"/>
                              <Thread id={132456} url="home"/>
                            </div>

          //Sub forum do not have child
        }
        this.content =<div>
                        <ReactLink to={'/subforum/'+this.id}>
                          <button type="button" className="btn btn-link btn-subforum">
                            <div className="avatar">
                              <img src={avatar} alt="SubForumAvatar"></img>
                            </div>
                            <div className="title">
                              {this.title}
                            </div>
                          </button>
                          {this.childcontent}
                        </ReactLink>
                      </div>
        
      }
      //Content for sub sub forum (parent_id != 0)
      else if(this.props.parent_id !== 0){
        this.content = <div> 
                        <ReactLink to={'/subforum/'+this.id}>
                          <button type="button" className="btn btn-link btn-subforum">
                            <div className="avatar">
                              <img src={avatar} alt="SubForumAvatar"></img>
                            </div>
                            <div className="title">
                              {this.title}
                            </div>
                          </button>
                        </ReactLink>
                      </div>
      }
    }
    this.setState({id:this.id}); 
  }

  render() {
    return (
      <div className={this.props.url}>
        
          {this.content}

      </div>
    );
  }
}

