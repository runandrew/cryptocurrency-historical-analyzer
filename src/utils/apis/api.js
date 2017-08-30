type ApiCall = {
  path: string
};

export const get = ({ path }: ApiCall): Promise => {
  return fetch(path, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      throw err;
    });
};
