// @flow

import React, { Component } from "react";
import ReactDOM from "react-dom";

import OtterComponentWrapper from "./components/OtterComponentWrapper.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <OtterComponentWrapper />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
