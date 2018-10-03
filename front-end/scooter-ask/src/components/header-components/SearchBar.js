import React, { Component } from 'react';
import '../../stylesheet/Header.css';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state= {searchValue:''}
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({searchValue: event.target.value});
    
  }


  render() {
    //FOR CLEAR BUTTON
    var clearButtonClassName = "search-clear"
    if (this.state.searchValue.length===0){
        clearButtonClassName = "search-clear cleared"
    }
    return (
        <div className="input-group">
        <form>
          <input id="search" type="text" className="form-control" placeholder="Ask something..." aria-label="Search-bar" onChange={this.handleSearchChange}></input>
          <div>
            <button className={clearButtonClassName} type="reset"></button>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
