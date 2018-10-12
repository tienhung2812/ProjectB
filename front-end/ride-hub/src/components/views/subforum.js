import React, { Component } from "react";
import { browserHistory } from 'react-router';
import {Link as ReactLink} from 'react-router';
import './view-stylesheet/subforum.css';
import avatar from '../../sampleSubForumIcon/cycle.png'
import Thread from './thread';
import { type } from "os";
export default class SubForum extends Component {
  constructor(props){
    super(props);
    this.state = {id:null,description:null, type:1, following : false,title:null,followerNumber:null,child:[]}
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

    //Change url in subforum page
    if(this.props.url !== "home" && this.props.url !=="subsubforum"){
      browserHistory.push('/subforum/'+this.props.params.id);
      this.id = this.props.params.id;
    }else{
      this.id=this.props.id
    }

    this.setState({id:this.id}); 

    //fetch data
    console.log('http://ride-hub.herokuapp.com/api/subforum/'+this.id)
    fetch('http://ride-hub.herokuapp.com/api/subforum/'+this.id)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data=data[0];     
      this.setState({
        title:data.title,
        type:data.type,
        followerNumber:data.followers,
        following:data.user_following_state,
        child: JSON.parse("[" + data.child + "]"),
        description:data.description
      })
    });
  }

  componentDidUpdate(){
    if(this.props.url !== "home" && this.props.url !=="subsubforum"){
      if(this.state.id!==this.props.params.id){
        this.id = this.props.params.id;
        this.setState({id:this.id})

      }
    }
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
          {this.state.followerNumber+" followers"}
        </div>
        <div className="statusDivider"></div>
        <div className="threadstatus">
          123 threads
        </div>
      </div>
      //Add Post button
      if(this.state.type===1){
        this.addThreadBtn =       
          <button type="button" className="btn btn-link btn-createThread">
            <ReactLink to={'/addthread/'+this.state.id}>
            create Thread
            </ReactLink>
          </button>
      }

      //Child content
      //Sepereate type
      if(this.state.child.length!==0){
        if(this.state.type===0){
          //This is example before having API, this section will be deleted after done API
          //Generate some sub sub Forum
          
          this.childcontent=[]
          for(var i=0;i<this.state.child.length;i++){
            console.log(this.state.child[i])
            this.childcontent.push(<SubForum id={this.state.child[i]} url="subsubforum" parent_id={this.state.id}/>)
          }


          //Sub Forum have child
        }else{
          //This is example before having API, this section will be deleted after done API
          //Generate some thread
          this.childcontent = []
          for(var i=0;i<this.state.child.length;i++){
            this.childcontent.push(<Thread id={this.state.child[i]} url="home"/>)
          }
          //Sub forum do not have child
        }
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
                {this.state.title}
              </div>
              
              <div className="subforum-description">
                {this.state.description}
              </div>
            </div>
            <div className="btn-status-wrapper">
              <div className="btn-status-content">
                {this.addThreadBtn}
                {this.followStatus}
                {this.subforumStatus}
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="subsubforum-wrapper">
              {this.childcontent}
            
            </div>
            
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
          this.childcontent=[]
          for(var i=0;i<this.state.child.length;i++){
            console.log(this.state.child[i])
            this.childcontent.push(<SubForum id={this.state.child[i]} url="subsubforum" parent_id={this.state.id}/>)
          }
          //Sub Forum have child
        }else{
          //This is example before having API, this section will be deleted after done API
          //Generate some thread
          this.childcontent = []
          for(var i=0;i<this.state.child.length;i++){
            this.childcontent.push(<Thread id={this.state.child[i]} url="home"/>)
          }

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
                    {this.state.title}
                  </div>
                </button>
                </ReactLink>
                {this.childcontent}
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
                    {this.state.title}
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

