// @flow

import * as React from "react";
import type { HistoryRangePoint } from "../../../utils/exchange";
import { head, last } from "lodash";
import type { HistoryRangePointComparison } from "./ReturnWrapper";
import { styled } from "styletron-react";
import { convertEpochToDate } from "../../../utils/date";

type Props = {
  data: HistoryRangePointComparison
};

class Return extends React.Component<void, Props, void> {
  render() {
    const { data } = this.props;
    return (
      <CardBack>
        <LeftDataBack>
          <ProductTitle>{data.productId}</ProductTitle>
          <TextRow>{`Start Price: ${data.startPrice.toFixed(2)}`}</TextRow>
          <TextRow>{`Start Date: ${convertEpochToDate(
            data.startDate
          )}`}</TextRow>
          <TextRow>{`End Price: ${data.endPrice.toFixed(2)}`}</TextRow>
          <TextRow>{`End Date: ${convertEpochToDate(data.endDate)}`}</TextRow>
        </LeftDataBack>
        <RightDataBack>
          <PercentageText>{`${parseInt(data.pctChange, 10)}`}</PercentageText>
          <span>Total change [%]</span>
        </RightDataBack>
      </CardBack>
    );
  }
}

const CardBack = styled("div", {
  width: "700px",
  minHeight: "200px",
  margin: "8px auto",
  flexDirection: "row",
  display: "flex",
  backgroundColor: "#ffffff",
  border: "1px solid #DAE1E9",
  borderRadius: "3px",
  padding: "16px",
  boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
  ":hover": {
    boxShadow: "2px 2px 3px 0 rgba(0,0,0,0.1)"
  }
});

const LeftDataBack = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 0.7
});

const RightDataBack = styled("div", {
  display: "flex",
  flexDirection: "column",
  flex: 0.3,
  alignItems: "center",
  justifyContent: "center"
});

const TextRow = styled("div", {
  margin: "6 0"
});

const ProductTitle = styled("span", {
  fontSize: "36px",
  color: "#4E5C6E"
});

const PercentageText = styled("span", {
  fontSize: "50px",
  color: "#3ea055"
});

export default Return;
