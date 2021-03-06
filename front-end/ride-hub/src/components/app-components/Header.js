import React, { Component } from 'react';
import {Link as ReactLink} from 'react-router';
import SearchBar from './header-components/SearchBar';
import Account from './header-components/AccountDropdown';
import Notification from './header-components/Notification';
import '../stylesheet/Header.css';
import logo from '../../logo.png';
class Header extends Component {
  constructor(props){
    super(props);
    this.logo = 
    <ReactLink to={'/'}>
      <div className="logo btn btn-light">
          <div className="logo-img">
            <img src={logo} alt="logo"></img>
          </div>
        </div>
    </ReactLink>
  }

  render() {
    return (
      <div className="header-container">
        {this.logo}
        <div className="search">
          <SearchBar/>
        </div>
        <div className="functionButtons">
          <div className="notification-button">
            <Notification/>
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
