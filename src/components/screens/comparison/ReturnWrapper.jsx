// @flow

import * as React from "react";
import Return from "./Return.jsx";
import type { HistoryRangePoint } from "../../../utils/exchange";
import type { GdaxHistoryRangeInput } from "../../../utils/apis/gdax";
import {
  getHistoryRange,
  createRandomHistoryRequestArray
} from "../../../utils/exchange";
import {
  createDateObject,
  convertDateObjectToISOString
} from "../../../utils/date";
import { has as ldHas, head as ldHead, last as ldLast } from "lodash";

// Types
export type HistoryRangePointComparison = {
  startPrice: number,
  endPrice: number,
  startDate: number,
  endDate: number,
  priceDiff: number,
  pctChange: number,
  productId: string
};

type Props = {
  productId: string
};

type State = {
  historyComparisons?: Array<HistoryRangePointComparison>
};

// Component
class ReturnWrapper extends React.Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      historyComparisons: undefined
    };
  }

  componentDidMount(): void {
    const { productId } = this.props;
    const historyRequests = createRandomHistoryRequestArray(5);

    Promise.all(historyRequests.map(getHistoryRange))
      .then(fulfilledRequests => {
        this.setState({
          historyComparisons: fulfilledRequests.map(mapHistoryDataStartEnd)
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { historyComparisons } = this.state;
    return (
      <div>
        {historyComparisons ? (
          <div>
            {historyComparisons.map((comparison, i) => (
              <Return key={i} data={comparison} />
            ))}
          </div>
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
  data: Array<HistoryRangePoint>
): HistoryRangePointComparison {
  const start = ldLast(data);
  const end = ldHead(data);
  const priceDiff = calculateDiff(start, end, "open");
  const pctChange = (end.open / start.open - 1) * 100;

  return {
    startPrice: start.open,
    endPrice: end.open,
    startDate: start.time,
    endDate: end.time,
    priceDiff,
    productId: start.productId,
    pctChange
  };
}

export default ReturnWrapper;
