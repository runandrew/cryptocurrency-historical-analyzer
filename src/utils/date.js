// @flow

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

/** Converts a Date object into an ISO string */
export const convertDateObjectToISOString = (dateObj: Date): DateISO => {
  return dateObj.toISOString();
};
