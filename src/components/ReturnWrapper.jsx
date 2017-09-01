// @flow

import * as React from "react";
import Return from "./Return.jsx";
import type { HistoryRangePoint } from "../utils/exchange";
import { getHistoryRange } from "../utils/exchange";
import { createDateObject, convertDateObjectToISOString } from "../utils/date";
import { has as ldHas, head as ldHead, last as ldLast } from "lodash";

export type HistoryRangePointComparison = {
  startPrice: number,
  endPrice: number,
  startDate: number,
  endData: number,
  priceDiff: number | null
};

type Props = {};

type State = {
  historyComparison?: HistoryRangePointComparison
};

class ReturnWrapper extends React.Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      historyComparison: undefined
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
        historyComparison: mapHistoryDataStartEnd(historyRange)
      });
    });
  }

  render() {
    const { historyComparison } = this.state;

    return (
      <div>
        {historyComparison ? (
          <Return data={this.state.historyComparison} />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }
}

function calculateDiff(first: *, second: *, property: string): * {
  if (ldHas(first, property) && ldHas(second, property)) {
    return second[property] - first[property];
  } else {
    return null;
  }
}

function mapHistoryDataStartEnd(
  data: Array<HistoryRangePoint>
): HistoryRangePointComparison {
  const start = ldLast(data);
  const end = ldHead(data);

  return {
    startPrice: start.open,
    endPrice: end.open,
    startDate: start.time,
    endData: end.time,
    priceDiff: calculateDiff(start, end, "open")
  };
}

export default ReturnWrapper;
