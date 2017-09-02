// @flow
import { fetchServerTime } from "./apis/gdax";
import moment from "moment";

type CreateDateObjectInput = {
  year: number,
  month: number,
  date: number
};

type DateISO = string;

/** Creates a new Date object */
export const createDateObject = (dateNumbers: CreateDateObjectInput): Date => {
  const { year, month, date } = dateNumbers;
  return new Date(year, month, date);
};

/** Creates a new Date object with the current time */
export const createDateObjectNow = (): Promise<string> =>
  fetchServerTime().then();

/** Converts a Date object into an ISO string */
export const convertDateObjectToISOString = (dateObj: Date): DateISO => {
  return dateObj.toISOString();
};

/** Converts a Unix timestamp to a formatted date */
export const convertEpochToDate = (unixTime: number): string => {
  return moment.unix(unixTime).format("dddd, MMMM Do YYYY");
};
