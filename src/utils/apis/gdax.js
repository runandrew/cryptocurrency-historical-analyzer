// @flow

import { get } from "./api";

// Constants
const GDAX_API = "https://api.gdax.com";

// Types
export type Seconds = number;
export type DateISO = string;
export type DateEpoch = number;
export type GdaxProductId = string;

export type GdaxProduct = {
  id: GdaxProductId,
  base_currency: string,
  quote_currency: string,
  base_min_size: string,
  base_max_size: string,
  quote_increment: string,
  display_name: string,
  margin_enabled: boolean
};

export type GdaxDayStats = {
  last: string,
  open: string,
  high: string,
  low: string,
  volume: string,
  volume_30day: string
};

export type GdaxHistoryRangeInput = {
  productId: GdaxProductId,
  start: DateISO,
  end: DateISO,
  granularity: Seconds
};

export type GdaxHistoryPoint = [number, number, number, number, number, number];

export type GdaxServerTime = {
  iso: DateISO,
  epoch: DateEpoch
};

// API
/** GDAX API: gets a list of products */
export const fetchProducts = (): Promise<Array<GdaxProduct>> => {
  return get({ path: `${GDAX_API}/products` });
};

/** GDAX API: gets a product's 24hr stats */
export const fetchProductDayStats = (
  productId: string
): Promise<GdaxDayStats> => {
  return get({
    path: `${GDAX_API}/products/${productId}/stats`
  });
};

/** GDAX API: get a product's history within a range. `granularity` is in seconds, `start/end` in ISO time */
export const fetchHistoryRange = ({
  productId,
  start,
  end,
  granularity
}: GdaxHistoryRangeInput): Promise<Array<GdaxHistoryPoint>> => {
  return get({
    path: `${GDAX_API}/products/${productId}/candles?start=${start}&end=${end}&granularity=${granularity}`
  });
};

/** GDAX API: get the server's time */
export const fetchServerTime = (): Promise<GdaxServerTime> => {
  return get({ path: `${GDAX_API}/time` });
};
