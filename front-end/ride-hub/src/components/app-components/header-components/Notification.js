import React, { Component } from 'react';
import '../../stylesheet/Header.css';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={unread:true}
        this.handleReadNotification = this.handleReadNotification.bind(this);
      }

  componentDidMount(){
      this.childcontent=[];
      for(var i=0;i<5;i++){
        this.childcontent.push(
            <div className="child">
              @fafsdn have comment on your post
            </div>
        )
      }
      
  }

  handleReadNotification(){
    if(this.state.unread){
        this.setState({unread:false})
    }
  }

  render() {

    return (
        <div className="btn-group">
            <button type="button" className={"btn btn-link dropdown-toggle "+this.state.unread} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleReadNotification}>
                <i className="fas fa-bell"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                {this.childcontent}
            </div>
        </div>
    );
  }
}

export default Notification;
