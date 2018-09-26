import React, { Component } from 'react';
import '../stylesheet/Header.css';
import logo from '../logo.png';
class Header extends Component {
  constructor(props){
    super(props);
    this.logo = 
      <div className="logo btn btn-light">
          <div className="logo-img">
            <img src={logo} alt="logo"></img>
          </div>
          <div className="logo-name">
            <h1>Scooter Ask</h1>
          </div>
        </div>

    this.searchbar = <div className="input-group">
          <input id="search" type="text" class="form-control" placeholder="Ask something..." aria-label="Search-bar"></input>
        </div>
    
    

  }
  render() {
    

    return (
      <div className="header-container">
        {this.logo}
        <div className="search">
          {this.searchbar}
        </div>
        <div className="functionButtons">
          <div className="add-post-button">
          </div>
          <div className="notification-button">
          </div>
        </div>
        <div className="account">
        </div>
      </div>
    );
  }
}

export default Header;
