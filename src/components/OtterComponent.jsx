// @flow

import * as React from "react";
import type { Otter } from "../utils/db";

type Props = {
  otter: Otter
};

class OtterComponent extends React.Component {
  props: Props;

  render() {
    const { name, picUrl } = this.props.otter;
    return (
      <div key={name}>
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <img width={300} src={picUrl} />
        </div>
      </div>
    );
  }
}

export default OtterComponent;
