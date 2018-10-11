import React, { Component } from 'react';
import '../../stylesheet/Header.css';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state= {searchValue:'',displayResult:false}
    this.searchInput = React.createRef();
    this.handleSearchChange = this.handleSearchChange.bind(this);
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


  render() {
    //FOR CLEAR BUTTON
    var clearButtonClassName = "search-clear"
    if (this.state.searchValue.length===0){
        clearButtonClassName = "search-clear cleared"
    }

    //Style for search result
    if(this.searchInput.current!==null)
      console.log("moun")
    var searchResultStyle="";
    // if(this.searchInput.current.offsetWidth>0){
    //   var searchResultStyle = {
    //     width:this.searchInput.current.offsetWidth
    //   }
    // }
    

    return (
      <div>
        <div className="input-group">
          <form ref={this.searchInput}>
            <input type="text" className="form-control" placeholder="Ask something..." aria-label="Search-bar" onChange={this.handleSearchChange}></input>
            <div>
              <button className={clearButtonClassName} type="reset"></button>
            </div>
          </form>
        </div>
        <div className={"search-result-wrapper "} style={searchResultStyle}>
          <div className={"search-result "+this.state.displayResult}>
            {this.sampleResult}
          </div>
          
        </div>
      </div>
        
    );
  }
}

export default SearchBar;
