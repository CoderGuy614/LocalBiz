export const getBusinesses = () => {
  return fetch(`${process.env.REACT_APP_API}/biz/list`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getBusiness = (id) => {
  return fetch(`${process.env.REACT_APP_API}/biz/${id}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getItems = (id) => {
  return fetch(`${process.env.REACT_APP_API}/items/${id}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API}/categories/list`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
