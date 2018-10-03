import React, { Component } from 'react';
import SearchBar from './header-components/SearchBar';
import Account from './header-components/AccountDropdown';
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


  }

  render() {
    return (
      <div className="header-container">
        {this.logo}
        <div className="search">
          <SearchBar/>
        </div>
        <div className="functionButtons">
          <div className="add-post-button">
            <i class="fas fa-plus"></i>
          </div>
          <div className="notification-button">
            <i class="fas fa-bell"></i>
          </div>
        </div>
        <div className="account">
          <Account/>
        </div>
      </div>
    );
  }
}

export default Header;
