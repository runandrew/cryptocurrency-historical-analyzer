// @flow

import * as React from "react";
import Return from "./Return.jsx";
import type { HistoryRangePoint } from "../utils/exchange";
import { getHistoryRange } from "../utils/exchange";
import { createDateObject, convertDateObjectToISOString } from "../utils/date";
import { has as ldHas, head as ldHead, last as ldLast } from "lodash";

// Types
export type HistoryRangePointComparison = {
  startPrice: number,
  endPrice: number,
  startDate: number,
  endData: number,
  priceDiff: number,
  pctChange: number
};

type Props = {
  productId: string
};

type State = {
  historyComparison?: HistoryRangePointComparison
};

// Component
class ReturnWrapper extends React.Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      historyComparison: undefined
    };
  }

  componentDidMount(): void {
    const { productId } = this.props;
    const start = createDateObject({ year: 2017, month: 7, date: 4 });

    const getHistoryInfo = {
      productId: productId,
      start: convertDateObjectToISOString(start),
      end: convertDateObjectToISOString(new Date()),
      granularity: 60 * 60 * 24
    };

    getHistoryRange(getHistoryInfo).then(historyRange => {
      this.setState({
        historyComparison: mapHistoryDataStartEnd(historyRange, productId)
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

// Helpers
function calculateDiff(first: *, second: *, property: string): * {
  if (ldHas(first, property) && ldHas(second, property)) {
    return second[property] - first[property];
  } else {
    return 0;
  }
}

function mapHistoryDataStartEnd(
  data: Array<HistoryRangePoint>,
  productId: string
): HistoryRangePointComparison {
  const start = ldLast(data);
  const end = ldHead(data);
  const priceDiff = calculateDiff(start, end, "open");
  const pctChange = (end.open / start.open - 1) * 100;

  return {
    startPrice: start.open,
    endPrice: end.open,
    startDate: start.time,
    endData: end.time,
    priceDiff,
    productId,
    pctChange
  };
}

export default ReturnWrapper;
