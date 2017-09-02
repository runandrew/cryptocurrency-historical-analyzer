// @flow

import * as React from "react";
import { styled } from "styletron-react";

import ReturnWrapper from "./screens/comparison/ReturnWrapper.jsx";

// Component
class MainWrapper extends React.Component<void, void, void> {
  render() {
    return (
      <MainWrapperBack>
        <ReturnWrapper productId={"BTC-USD"} />
      </MainWrapperBack>
    );
  }
}

const MainWrapperBack = styled("div", {
  width: "978px",
  margin: "0 auto"
});

export default MainWrapper;
