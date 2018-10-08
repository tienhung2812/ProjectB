import React, { Component } from "react";
import { browserHistory } from 'react-router';
import './view-stylesheet/addthread.css';


export default class TextEditor extends Component {
  constructor(props){
    super(props);
   
  }
  componentDidMount() {
    browserHistory.push('/addthread/');
    
  }

  render() {
      return (
    <div className='add-thread-wrapper'>
        This is Add thread pages
    </div>
      );
  }
}

