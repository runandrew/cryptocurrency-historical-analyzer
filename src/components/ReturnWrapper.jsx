// @flow

import * as React from "react";
import Return from "./Return.jsx";
import type { HistoryRangePoint } from "../utils/exchange";
import { getHistoryRange } from "../utils/exchange";
import { createDateObject, convertDateObjectToISOString } from "../utils/date";

type Props = {};
type State = {
  range?: Array<HistoryRangePoint>
};

class ReturnWrapper extends React.Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      range: undefined
    };
  }

  componentDidMount(): void {
    const start = createDateObject({ year: 2017, month: 7, date: 4 });

    getHistoryRange({
      productId: "BTC-USD",
      start: convertDateObjectToISOString(start),
      end: convertDateObjectToISOString(new Date()),
      granularity: 60 * 60 * 24
    }).then(historyRange => {
      this.setState({
        range: historyRange
      });
    });
  }

  render() {
    const { range } = this.state;

    return (
      <div>
        {range ? <Return data={this.state.range} /> : <span>Loading...</span>}
      </div>
    );
  }
}

export default ReturnWrapper;
