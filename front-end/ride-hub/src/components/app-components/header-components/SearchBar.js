import React, { Component } from 'react';
import Select from 'react-select/lib/Async';
import { BrowserRouter, Route } from 'react-router-dom'
import {Redirect,browserHistory} from 'react-router';
import PropTypes from 'prop-types'
import '../../stylesheet/Header.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];



class SearchBar extends Component {
  constructor(props,context){
    super(props,context);
    this.state= {searchValue:'',displayResult:false,selectedOption: null}
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
    }, 1000);
    return options;
  });
  
  getModelsAPI = (input) => {

    if (!input) {
        return Promise.resolve({ options: [] });
    }

    // const url = `(...)?cmd=item_codes_json&term=${input}`;

    // fetch(url, {credentials: 'include'})
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((json) => {
    //         const formatted = json.map((l) => {
    //             return Object.assign({}, {
    //                 value: l.value,
    //                 label: l.label
    //             });
    //         })
    //         return { options: formatted }
    //     })
    return options
}

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    
    console.log(`Option selected:`, selectedOption);
    
    //This will navigate to search page
    //browserHistory.push('/thread/1')
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

  handleRedirect(){
   
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
              // options={options}
              loadOptions={this.promiseOptions}
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
