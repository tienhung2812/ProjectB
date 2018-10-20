import React, { Component } from "react";
import './view-stylesheet/aboutus.css';
export default class AboutUs extends Component {
  constructor(props){
    super(props);


  }

  render() {
    return(<div className="main-content">   
        <div className="aboutus-content">
          <div className="title">
            About Us
          </div>
        <div className="sth">
        RideHub is a web forum providing a place for Vietnamese scooter community to meet and share their experiences, exchange information and learn from each other.
        </div>
        <div className="contact-us">
          <div className="label">
            Contact us
          </div>
          <div className="contact-content">
            Email: ridehub@gmail.com
            <br/>
            Mobile phone: 0839785895
            <br/>
            Admin: Nguyen Quy Vinh
          </div>

          
          
        </div>
        
        </div>
    </div>);
      
  }
}

