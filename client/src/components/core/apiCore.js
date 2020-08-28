import { json } from "body-parser";

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

export const createBiz = (biz) => {
  return fetch(
    `${process.env.REACT_APP_API}/biz/create/5f4493e81ab0002d9945e5b8`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: biz,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const createItem = (item) => {
  return fetch(
    `${process.env.REACT_APP_API}/item/create/5f4493e81ab0002d9945e5b8`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: item,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};
