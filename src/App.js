import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import axios from "axios";

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
  getzip(zip) {
    this.setState({ zipcode: zip });
  }
  async getWeatherAndRestaurants(zipcode) {
    if (zipcode == '' || zipcode == [] || zipcode.length <5){
      return alert('Invalid zip, must be 6 numbers long');
    };
    let searchZip = `https://api.wunderground.com/api/9d4257c7e0413f4b/conditions/q/  ${zipcode}  .json`;
    let weather = await axios.get(searchZip);
    let latValue =
      Math.round(
        weather.data.current_observation.display_location.latitude * 100
      ) / 100;
    let longValue =
      Math.round(
        weather.data.current_observation.display_location.longitude * 100
      ) / 100;
    console.log(weather, latValue, longValue);
    let searchCoords =
      "https://developers.zomato.com/api/v2.1/geocode?lat=" +
      latValue +
      "&lon=" +
      longValue;
    let restaurants = await axios.get(searchCoords, {
      headers: { "user-key": "2feb645051247922577a0d2f4a387122" }
    });
    console.log(restaurants);
  }
  render() {
    return (
      <div className="App">
        <SearchBar
          onSearchTermChange={this.getzip}
          onSubmit={this.getWeatherAndRestaurants}
        />
      </div>
    );
  }
}

export default App;
