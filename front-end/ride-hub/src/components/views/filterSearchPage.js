import React, { Component } from "react";
import { browserHistory } from 'react-router';
import Loader from '../app-components/Loader';
import Thread from './thread';
import './view-stylesheet/subforum.css'

export default class FilterSearchPage extends Component {
  constructor(props){
    super(props);
    this.state={loaded:false,searchData:null}
    this.child = <Loader/>
    
    this.handleFilterSearch = this.handleFilterSearch.bind(this);
    this.rawdata=''
    
  }
  componentDidMount() {
    if(this.props.params.data==null){
        browserHistory.push('/');
    }else{
        browserHistory.push('/filterSearch/'+this.props.params.data);
        this.rawdata=this.props.params.data;
        this.data = JSON.parse(this.props.params.data)
        this.handleFilterSearch(this.data);
    }
  }

  componentDidUpdate(){
    if(this.props.params.data!=this.rawdata){
        if(this.props.params.data==null){
            browserHistory.push('/');
        }else{
            this.child = <Loader/>
            console.log("New search")
            this.rawdata=this.props.params.data;
            
            this.setState({loaded:false})
            this.data = JSON.parse(this.props.params.data)
            this.handleFilterSearch(this.data);
        }
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
    if(this.state.loaded){

        this.childcontent = []
          for(var i=0;i<this.state.searchData.length;i++){
            this.childcontent.push(<Thread id={this.state.searchData[i].tid} url="home"/>)
          }
        if(this.childcontent.length>0)
            this.child = 
            <div className="main-subforum-content filterSearchPage">
                {this.childcontent}
            </div>
        else{
            this.child=<div className="filterseach-notfound">
                Not Found
            </div>
        }
    }
    return (
        <div className="main-content">
          {this.child}
        </div>
    );
  }
}

