// @flow

import { get } from "./api";

// Constants
const GDAX_API = "https://api.gdax.com";

// Types
export type GdaxProduct = {
  id: string,
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

// API
/** GDAX API: gets a list of products */
export const fetchProducts = (): Promise<Array<GdaxProduct>> => {
  return get({ path: `${GDAX_API}/products` });
};

/** GDAX API: gets a product's 24hr stats */
export const fetchProductDayStats = (productId: string): GdaxDayStats => {
  return get({
    path: `${GDAX_API}/products/${productId}/stats`
  });
};
