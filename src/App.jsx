// @flow

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { StyletronProvider } from "styletron-react";
import Styletron from "styletron-client";

import ReturnWrapper from "./components/ReturnWrapper.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <StyletronProvider styletron={new Styletron()}>
          <ReturnWrapper productId={"BTC-USD"} />
        </StyletronProvider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
