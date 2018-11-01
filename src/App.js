import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      zipcode: null
    };
    this.getzip = this.getzip.bind(this);
    this.getWeatherAndRestaurants = this.getWeatherAndRestaurants.bind(this);
  }
  getzip(zip){
    this.setState({zipcode:zip})
  }
  getWeatherAndRestaurants(zipcode){

  }
  render() {
    return (
      <div className="App">
        <SearchBar onSearchTermChange={this.getzip} onSubmit={this.getWeatherAndRestaurants} />
        
      </div>
    );
  }
}

export default App;
