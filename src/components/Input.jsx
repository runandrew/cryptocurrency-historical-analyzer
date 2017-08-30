// @flow

import * as React from "react";

type Props = {
  onChange: SyntheticInputEvent => void
};

class Input extends React.Component {
  props: Props;

  render() {
    const { onChange } = this.props;
    return <input onChange={onChange} />;
  }
}

export default Input;
