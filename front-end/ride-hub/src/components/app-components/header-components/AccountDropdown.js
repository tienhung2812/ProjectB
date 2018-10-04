import React, { Component } from 'react';
import '../../stylesheet/Header.css';

class AccountDropDown extends Component {
  constructor(props){
    super(props);
    this.state= {isLogged:false}
 
  }


  render() {

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar"></div>
                <div className="content">
                    <div className="username">Username</div>
                    <div className="point">100 points</div>
                </div>
                
            </button>
            <div className="dropdown-menu dropdown-menu-right">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
            </div>
        </div>
    );
  }
}

export default AccountDropDown;
