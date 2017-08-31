// @flow

import * as React from "react";
import type { HistoryRangePoint } from "../utils/exchange";
import { head, last } from "lodash";

type Props = {
  data: Array<HistoryRangePoint>
};

class Return extends React.Component<void, Props, void> {
  render() {
    const { data } = this.props;
    const start = last(data);
    const end = head(data);

    console.log(start);
    console.log(end);
    console.log(calculateDiff(start, end));
    return <div />;
  }
}

function calculateDiff(
  start: HistoryRangePoint,
  end: HistoryRangePoint
): number {
  return end.open - start.open;
}

export default Return;
