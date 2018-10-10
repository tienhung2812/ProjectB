import React, { Component } from 'react';
import '../../stylesheet/Header.css';

class AccountDropDown extends Component {
  constructor(props){
    super(props);
    this.state= {isLogged:true, username:"anoymous", point:"0"}
 
  }

  componentDidMount(){
      this.childcontent=[];
  }

  

  render() {
    //Set variable
    if(!this.state.isLogged){
        this.childcontent = []
        this.childcontent.push(
            <button className="dropdown-item" type="button" >Log in</button>
        )
        this.childcontent.push(
            <button className="dropdown-item" type="button">Sign up</button>
        );
    }else{
        this.childcontent = []
        this.childcontent.push(
            <button className="dropdown-item" type="button" >My Account</button>
        )
        this.childcontent.push(
            <button className="dropdown-item" type="button">Log out</button>
        );
    }

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar"></div>
                <div className="content">
                    <div className="username">{this.state.username}</div>
                    <div className="point">{this.state.point} points</div>
                </div>
                
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                        {this.childcontent}
            </div>
        </div>
    );
  }
}

export default AccountDropDown;
