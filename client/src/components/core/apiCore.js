import { json } from "body-parser";
import axios from "axios";

export const getBusinesses = (bizCat) => {
  return fetch(`${process.env.REACT_APP_API}/biz/list?category=${bizCat}`, {
    method: "GET",
  })
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

//Get All The Items for a Business by ID
export const getItems = (bizId) => {
  return fetch(`${process.env.REACT_APP_API}/items/${bizId}`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get one Item By It's ID
export const getItem = (itemId) => {
  return fetch(`${process.env.REACT_APP_API}/item/${itemId}`, { method: "GET" })
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

export const createBiz = (biz, userId) => {
  return fetch(`${process.env.REACT_APP_API}/biz/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: biz,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const createItem = (item, userId) => {
  return fetch(`${process.env.REACT_APP_API}/item/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: item,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const updateItem = (itemId, item) => {
  return fetch(`${process.env.REACT_APP_API}/item/update/${itemId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: item,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateHours = (hours, bizId, userId) => {
  return axios({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `${process.env.REACT_APP_API}/biz/hours/${bizId}/${userId}`,
    data: JSON.stringify(hours),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const getHours = (bizId) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/biz/hours/${bizId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const deleteItem = (itemId, userId = "5f4493e81ab0002d9945e5b8") => {
  return axios({
    method: "delete",
    // Put Authorization Token Here Later
    url: `${process.env.REACT_APP_API}/item/delete/${userId}/${itemId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const updateBiz = (values, bizId) => {
  return axios({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `${process.env.REACT_APP_API}/biz/update/${bizId}`,
    data: values,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const deleteBiz = (bizId) => {
  return axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}/biz/${bizId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};
