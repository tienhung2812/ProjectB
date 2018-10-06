import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import './view-stylesheet/subforum.css';
import avatar from '../../sampleSubForumIcon/cycle.png'
import Thread from './thread';
export default class SubForum extends Component {
  constructor(props){
    super(props);
    this.state = {id:null, type:1, following : false}
    this.handleFollowBtn = this.handleFollowBtn.bind(this);
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
      //this.setState({type:this.props.type})
    }

    this.setState({id:this.id}); 
  }


  //Fucntion for handle follow button
  handleFollowBtn(){
    if(this.state.following){
      //Unfollow
      this.setState({following:false})
    }else{
      //Follow
      this.setState({following:true})
    }
   
  }

  render() {
    if(this.props.url !== "home" && this.props.url !=="subsubforum"){
      this.id = this.props.params.id;

      //Setup Variable
      //Follow status
      if(this.state.following){
        this.followStatus = 
          <button type="button" className="btn btn-link btn-follow following" onClick={this.handleFollowBtn}>
            following
          </button>
      }else{
        this.followStatus=
          <button type="button" className="btn btn-link btn-follow" onClick={this.handleFollowBtn}>
            follow
          </button>
      }
      //Subforum status
      this.subforumStatus = 
      <div className="subforum-status">
        <div className="followerstatus">
          999 followers
        </div>
        <div className="statusDivider"></div>
        <div className="threadstatus">
          123 threads
        </div>
      </div>
      //Child content
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

      //Content for Subforum page
      return(
        <div className="main-subforum-content">
          <div className="title-wrapper">
            <div className="avatar">
              <img src={avatar} alt="SubForumAvatar"></img>
            </div>
            <div className="title">
              <div className="subforum-name">
                {this.title}
              </div>
              
              <div className="subforum-description">
                This is the description of Subforum
              </div>
            </div>
            <div className="btn-status-wrapper">
              <div className="btn-status-content">
                {this.followStatus}
                {this.subforumStatus}
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            {this.childcontent}
          </div>
      </div>
      );
      

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
        return(
          <div className={this.props.url}>
            <div>
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
          </div>
        );  
      }
      //Content for sub sub forum (parent_id != 0)
      else if(this.props.parent_id !== 0){
        return( 
          <div className={this.props.url}>
            <div> 
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
          </div>
        );
      }
    }

  }
}

