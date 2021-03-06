import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) { //on zip code change , update the state to the inputs value
    this.setState({ zipcode: event.target.value });
  }
  handleSubmit = e => { 
    e.preventDefault();
    this.props.onSubmit(this.state.zipcode);
    // e.preventDefault();
  };

  render() {
    return (
      <div>
        <main role="main">
          <section className="open-screen">
            <h1>Fast Foodie</h1>
            <h2>
              Input your Zip Code in order to get the 9 top restaurants in your
              area and weather to plan a quick meal out!
            </h2>
            <form id="form" onSubmit={this.handleSubmit}>
              <input
                placeholder="85281"
                className="user-input"
                value={this.state.zipcode}
                onChange={this.handleChange}
              />
              <br />
              <input className="search-button" type="submit" value="Search" />
            </form>
          </section>
          <div className="weather-results">
            <ul />
          </div>
          <section className="results-wrapper" />
        </main>
      </div>
    );
  }
}

//https://stackoverflow.com/questions/35905988/react-js-how-to-append-a-component-on-click
