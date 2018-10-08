import React, { Component } from "react";
import defaultavatar from '../../defaultavatar.png';
import './view-stylesheet/post.css';


export default class Thread extends Component {
  constructor(props){
    super(props);
    this.state = {threadID:null,postID:null,likeStatus:false}
    //Props url
    //home: display in HOMEPAGE
    //subforum: display in SUB-FORUM PAGE
    //null: display in THREAD PAGE

    this.handleLikeBtn = this.handleLikeBtn.bind(this);
  }
  componentDidMount() {
    //Set state
    this.setState({threadID:this.props.threadID})
    
    //Default variable
    this.username = 'Username';
    this.profilePicture = defaultavatar;
    this.postTime = '4:53 4th July 2018';
    this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    //Temp
    this.type = this.props.type;

    
  }

  handleLikeBtn(){
    if(this.state.likeStatus){
        this.setState({likeStatus:false})
    }else{
        this.setState({likeStatus:true})
    }
  }

  render() {
    //Variable
    //Vote Button
    if(this.state.likeStatus){
        this.likeBtn=<i className="fas fa-heart"></i>
    }else{
        this.likeBtn=<i className="far fa-heart"></i>
    }

    if(this.type === "original-post"||this.type==='comment-post'){
        
    return (
        <div className={this.type}>
            <div className="post-info-wrapper">
                <div className="avatar">
                    <img src={this.profilePicture} alt="userProfilePicture"></img>
                </div>
                <div className="post-info">
                    <div className="username">
                        {this.username}
                    </div>
                    <div className="post-time">
                        {this.postTime}
                    </div>
                </div>
                <div className={"like-btn"}>
                    <button type="button" className={'btn btn-link '+this.state.likeStatus} onClick={this.handleLikeBtn}>
                        {this.likeBtn}
                    </button>     
                </div>
            </div>
            <div className="post-content-wrapper">
                {this.content}
            </div>
        </div>
    );
    }else {
        return (
        <div>Not found!</div>
        );
    }
      
  }
}

