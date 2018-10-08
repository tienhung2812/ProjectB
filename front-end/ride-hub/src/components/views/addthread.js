import React, { Component } from "react";
import { browserHistory } from 'react-router';
import TextEditor from './textEditor';
import './view-stylesheet/addthread.css';


export default class AddThread extends Component {
  constructor(props){
    super(props);
   
  }
  componentDidMount() {
    browserHistory.push('/addthread/');
    
  }

  render() {
    return (
    <div className='add-thread-wrapper'>
    <div class="container ">
      <br/>
      <h5 class="card-title">Create a post</h5>
      <hr/>
            <TextEditor type="addthread"/>
    </div>
    </div>
      );
  }
}

