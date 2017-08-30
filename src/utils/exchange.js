import { fetchProducts, fetchProductDayStats } from "./apis/gdax";

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

// API
/** API call to get a list of products */
export const getProducts = (): Array<Product> => {
  return fetchProducts().then(products => {
    return mapProducts(products);
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
