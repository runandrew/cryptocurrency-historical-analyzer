// @flow

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { StyletronProvider } from "styletron-react";
import Styletron from "styletron-client";

import ReturnWrapper from "./screens/comparison/ReturnWrapper.jsx";
import MainWrapper from "./MainWrapper.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <StyletronProvider styletron={new Styletron()}>
          <MainWrapper />
        </StyletronProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
