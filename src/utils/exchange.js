// @flow

import {
  fetchProducts,
  fetchProductDayStats,
  fetchHistoryRange
} from "./apis/gdax";
import type {
  GdaxDayStats,
  GdaxProduct,
  GdaxHistoryPoint,
  GdaxHistoryRangeInput
} from "./apis/gdax";
import {
  convertDateObjectToISOString,
  createDateObject,
  createDateObjectNow
} from "./date";

type Product = {
  id: string,
  baseCurrency: string,
  quoteCurrency: string,
  quoteIncrement: string,
  displayName: string
};

type DayStats = {
  open: string,
  high: string,
  low: string,
  volume: string,
  volume30Day: string,
  last: string
};

export type HistoryRangePoint = {
  time: number,
  low: number,
  high: number,
  open: number,
  close: number,
  volume: number,
  productId: string
};

// API
/** API call to get a list of products */
export const getProducts = (): Promise<Array<Product>> => {
  return fetchProducts().then(products => {
    return mapProducts(products);
  });
};

/** API call to get the 24hr stats for a product */
export const getProductDayStats = (productId: string): Promise<DayStats> => {
  return fetchProductDayStats(productId).then(stats => {
    return mapDayStats(stats);
  });
};

/** API call to get history range */
export const getHistoryRange = (
  settings: GdaxHistoryRangeInput
): Promise<Array<HistoryRangePoint>> => {
  return fetchHistoryRange(settings).then(historyRanges => {
    return mapHistoryRange(historyRanges, settings.productId);
  });
};

// Helpers
const mapProducts = (products: Array<GdaxProduct>): Array<Product> => {
  return products.map(product => ({
    id: product.id,
    baseCurrency: product.base_currency,
    quoteCurrency: product.quote_currency,
    quoteIncrement: product.quote_increment,
    displayName: product.display_name
  }));
};

const mapDayStats = (stats: GdaxDayStats): DayStats => {
  return {
    open: stats.open,
    high: stats.high,
    low: stats.low,
    volume: stats.volume,
    volume30Day: stats.volume_30day,
    last: stats.last
  };
};

const mapHistoryRange = (
  ranges: Array<GdaxHistoryPoint>,
  productId
): Array<HistoryRangePoint> => {
  return ranges.map(singlePoint => ({
    time: singlePoint[0],
    low: singlePoint[1],
    high: singlePoint[2],
    open: singlePoint[3],
    close: singlePoint[4],
    volume: singlePoint[5],
    productId
  }));
};

const createRandomHistoryRequest = (): GdaxHistoryRangeInput => {
  return {
    productId: "LTC-USD",
    start: convertDateObjectToISOString(
      createDateObject({
        year: 2017,
        month: 7,
        date: parseInt(Math.random() * 20 + 1, 10)
      })
    ),
    end: convertDateObjectToISOString(
      createDateObject({
        year: 2017,
        month: 7,
        date: parseInt(Math.random() * 5 + 25, 10)
      })
    ),
    granularity: 60 * 60 * 24
  };
};

export const createRandomHistoryRequestArray = (
  numRequest: number
): Array<GdaxHistoryRangeInput> => {
  return Array(numRequest)
    .fill(1)
    .map(() => createRandomHistoryRequest());
};
