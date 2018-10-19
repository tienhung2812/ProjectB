import React, { Component } from "react";
import { browserHistory } from 'react-router';
import Loader from '../app-components/Loader';
import Thread from './thread';
import './view-stylesheet/subforum.css'

export default class ResetPassword extends Component {
  constructor(props){
    super(props);
    this.state={loaded:false,searchData:null}

    
  }
  componentDidMount() {
    if(this.props.params.data==null){
        browserHistory.push('/');
    }else{
        browserHistory.push('/resetpassword/'+this.props.params.data);
        console.log(this.props.params.data)
    }
  }

  handleFilterSearch=(data)=>{
    let body = JSON.stringify(data)
    fetch('https://ride-hub.herokuapp.com/api/thread/filter', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: body}).then(response=>{
            if(response.status===200){
                response.json().then(
                    data=>{
                        console.log(data)
                        this.setState({loaded:true,searchData:data})
                    }
                )
                
            }else{
                alert("Error: "+response.status)
            }
        }

      )
  }
  render() {
    return (
        <div className="main-content">
          {this.child}
        </div>
    );
  }
}

