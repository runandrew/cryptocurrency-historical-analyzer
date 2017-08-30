// @flow

import * as React from "react";
import type { Otter } from "../utils/db";
import { loadDb } from "../utils/db";
import OtterComponent from "./OtterComponent.jsx";
import Input from "./Input.jsx";
import { getProducts } from "../utils/exchange";

type Props = {};
type State = {
  data?: Array<Otter>,
  filter: string
};

class OtterComponentWrapper extends React.Component {
  props: Props;
  state: State;
  handleOnChange: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      data: undefined,
      filter: ""
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount(): void {
    const data = loadDb().then(data => {
      this.setState({
        data: data
      });
    });

    getProducts().then(products => {
      console.log(products);
    });
  }

  handleOnChange(event: SyntheticInputEvent): void {
    const value = event && event.target && event.target.value;
    this.setState({
      filter: value
    });
  }

  render() {
    let { data, filter } = this.state;

    if (data) {
      data = data.filter(data => data.name.indexOf(filter) > -1);
    }

    return (
      <div>
        {data ? (
          <div>
            <span>Filter:</span>
            <Input onChange={this.handleOnChange} />
            {data.map(otter => (
              <OtterComponent key={otter.name} otter={otter} />
            ))}
          </div>
        ) : (
          <div>
            <span>No data yet</span>
          </div>
        )}
      </div>
    );
  }
}

export default OtterComponentWrapper;
