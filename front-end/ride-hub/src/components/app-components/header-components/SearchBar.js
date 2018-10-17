import React, { Component } from 'react';
import Select from 'react-select/lib/Async';
import { BrowserRouter, Route } from 'react-router-dom'
import {Redirect,browserHistory} from 'react-router';
import PropTypes from 'prop-types'
import '../../stylesheet/Header.css';
import { runInThisContext } from 'vm';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

let timeout;
class SearchBar extends Component {
  constructor(props,context){
    super(props,context);
    this.state= {searchValue:'',displayResult:false,selectedOption: null,completed:true}
    this.searchInput = React.createRef();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(this.getModelsAPI(inputValue));
    }, 2000);
  });
  filterOptions(options) {
    return options;
  }
  getModelsAPI = (input,cb) => {
    this.setState({completed:false})
    if (!input) {
      this.setState({completed:true})
      return Promise.resolve({ options: options });
        
    }else{
      timeout = setTimeout(()=>{
        var body = JSON.stringify({
          text_search:input
        })
        fetch('https://ride-hub.herokuapp.com/api/thread/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: body
        }).then(response=>
          {
            if(response.status===200){
              response.json().then(
                data=>{
                  let options = []
                  options = data.map((l) => ({
                    value: l.tid,
                    label: l.t_title,
                  }))
                  console.log({options:options})
                  this.setState({completed:true})
                  cb(options);
                }
              )
            }
            this.setState({completed:true})
          })
      },2000)
    }
}

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    
    console.log(`Option selected:`, selectedOption);
    
    //This will navigate to search page
    browserHistory.push('/thread/'+selectedOption.value)
  }
  componentDidMount(){
    this.sampleResult = [];
    for(var i =0 ;i <4; i++){
      this.sampleResult.push(
        <div className="child">
          search search serach
        </div>
      )
    }

    
  }

  handleSearchChange(event) {
    this.setState({searchValue: event.target.value});
    if(event.target.value.length>0){
      this.setState({displayResult:true});
    }
    else{
      this.setState({displayResult:false});
    }
  }

  filterOptions(options) {
    return options;
  }

  render() {

    //FOR CLEAR BUTTON
    var clearButtonClassName = "search-clear"
    if (this.state.searchValue.length===0){
        clearButtonClassName = "search-clear cleared"
    }

    //Style for search result
    const { selectedOption } = this.state;


    return (
      <div>
        <div className="input-group">
          <form ref={this.searchInput}>
            <Select
              value={selectedOption}
              //options={this.state.options}
              loadOptions={this.getModelsAPI}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Ask something..."
            />
            {/* <input type="text"  placeholder="Ask something..." aria-label="Search-bar" onChange={this.handleSearchChange}></input> */}
            <div>
              <button className={clearButtonClassName} type="reset"></button>
            </div>
          </form>
        </div>
        <div className={"search-result-wrapper "}>
          <div className={"search-result "+this.state.displayResult}>
            {/* {this.sampleResult} */}
          </div>
          
        </div>
      </div>
        
    );
  }
  
}

export default SearchBar;
