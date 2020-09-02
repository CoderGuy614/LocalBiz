import { json } from "body-parser";
import axios from "axios";

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

export const updateHours = (
  hours,
  bizId,
  userId = "5f4493e81ab0002d9945e5b8"
) => {
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
