import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import axios from "axios";
// import Forecast from "./components/forecast";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      zipcode: null,
      temperature: "",
      conditions: ""
    };

    this.getWeatherAndRestaurants = this.getWeatherAndRestaurants.bind(this);
  }
  populateForecast() {}
  async getWeatherAndRestaurants(zipcode) {
    //input vaidation (look up regex)
    if (
      zipcode === "" ||
      zipcode === [] ||
      zipcode.length < 5 ||
      zipcode.length > 6
    ) {
      return alert("Invalid zip, must be 6 numbers long");
    }
    //setting up the api call for wunderground for weather and coords
    let searchZip = `https://api.wunderground.com/api/9d4257c7e0413f4b/conditions/q/  ${zipcode}  .json`;
    console.log("zip code is:", zipcode);
    let weather = await axios.get(searchZip);

    //setting up the api call for zomato
    // rounding both values in order to use them
    let latValue =
      Math.round(
        weather.data.current_observation.display_location.latitude * 100
      ) / 100;
    let longValue =
      Math.round(
        weather.data.current_observation.display_location.longitude * 100
      ) / 100;
    console.log(weather, latValue, longValue);
    let searchCoords = `https://developers.zomato.com/api/v2.1/geocode?lat= ${latValue} &lon= ${longValue}`;
    let restaurants = await axios.get(searchCoords, {
      headers: { "user-key": "2feb645051247922577a0d2f4a387122" }
    });
    //set state with
    this.setState({
      temperature: weather.data.current_observation.temp_f,
      conditions: weather.data.current_observation.weather
    });
    console.log("temperature is :", weather.data.current_observation.temp_f);
    console.log("conditions are :", weather.data.current_observation.weather);
    console.log("restaurants object is: ", restaurants);
  }
  render() {
    return (
      <div className="App">
        <SearchBar
          onSearchTermChange={this.getzip}
          onSubmit={this.getWeatherAndRestaurants}
        />
        <div>
          <form name="contact" method="post">
            <input type="hidden" name="form-name" value="contact" />
            <p>
              <label>
                Your Name: <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Your Email: <input type="email" name="email" />
              </label>
            </p>
            <p>
              <label>
                Message: <textarea name="message" />
              </label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
