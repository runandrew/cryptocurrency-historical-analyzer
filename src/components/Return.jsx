// @flow

import * as React from "react";
import type { HistoryRangePoint } from "../utils/exchange";
import { head, last } from "lodash";
import type { HistoryRangePointComparison } from "./ReturnWrapper";

type Props = {
  data: HistoryRangePointComparison
};

class Return extends React.Component<void, Props, void> {
  render() {
    const { data } = this.props;
    console.log(data);

    return <div />;
  }
}

export default Return;
