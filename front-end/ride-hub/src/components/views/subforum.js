import React, { Component } from "react";
import { browserHistory } from 'react-router';
import './view-stylesheet/subforum.css';
import avatar from '../../sampleSubForumIcon/cycle.png'

export default class SubForum extends Component {
  constructor(props){
    super(props);
    this.state = {id:null, type:0}
    //ID: Sub Forum ID
    //Type: 0 sub forum have child
    //Type: 1 sub forum does not have child

    //Props url
    //home: display in HOMEPAGE as parent_id == 0
    //subsubforum display in HOMEPAGE as subsub forum
    //subforum display in SUB-FORUM PAGE
    //subsubforum-sub display in SUB-FORUM PAGE
  }
  componentDidMount() {
    //Change url in subforum page
    if(this.props.url === "subforum")
      browserHistory.push('/subforum');
    
    //Temp add titile id 
    this.setState({id:this.props.id});
    if(this.props.url!=="subsubforum")
      this.title = "Sub Forum "+  String(this.props.id);
    else
      this.title = "Sub sub Forum";
    
    

    //Content for parent_id == 0 
    if (this.props.parent_id === 0){
      //Sepereate type
      if(this.state.type===0){
        //This is example before having API, this section will be deleted after done API
        //Generate some sub sub Forum
        this.subsubforum = <div className="subsubforum-wrapper">
                            <SubForum id={34535} url="subsubforum" parent_id={this.props.id}/>
                            <SubForum id={123414} url="subsubforum" parent_id={this.props.id}/>
                            <SubForum id={15135254} url="subsubforum" parent_id={this.props.id}/>
                          </div>
        //Sub Forum have child
        this.content =<div> 
                        <button type="button" className="btn btn-link btn-subforum">
                          <div className="avatar">
                            <img src={avatar} alt="SubForumAvatar"></img>
                          </div>
                          <div className="title">
                            {this.title}
                          </div>
                        </button>
                        {this.subsubforum}
                      </div>
      }else{
        //Sub forum do not have child
      }

      
    }
    //Content for sub sub forum (parent_id != 0)
    else if(this.props.parent_id !== 0){
      this.content = <div> 
                      <button type="button" className="btn btn-link btn-subforum">
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
      <div className={this.props.url}>
        {this.content}
      </div>
    );
  }
}

