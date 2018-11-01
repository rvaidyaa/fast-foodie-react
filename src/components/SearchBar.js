import React, { Component } from "react";
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zipcode: null
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ zipcode: event.target.value });
    this.props.onSearchTermChange(this.state.zipcode);
  }
  // handleSubmit(event){
  //   this.props.
  // }

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
            <form id="form">
              <input
                placeholder="ZipCode"
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
          <section role="wrapper" className="results-wrapper" />
        </main>
      </div>
    );
  }
}
