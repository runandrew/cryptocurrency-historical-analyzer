// @flow

import db from "../../db/otters.js";

export type Otter = {
  name: string,
  picUrl: string
};

export const loadDb = (): Promise<Array<Otter>> => {
  return Promise.resolve(db);
};
