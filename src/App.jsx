// @flow

import React, { Component } from "react";
import ReactDOM from "react-dom";

import ReturnWrapper from "./components/ReturnWrapper.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <ReturnWrapper />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
