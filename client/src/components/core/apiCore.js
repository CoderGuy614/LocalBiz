import axios from "axios";

export const getBusinesses = (bizCat) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/biz/list?category=${bizCat}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getBusiness = (id) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/biz/${id}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getItems = (bizId) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/items/${bizId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getItem = (itemId) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/item/${itemId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getCategories = () => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/categories/list`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createItem = (item, userId, token) => {
  return axios({
    method: "post",
    headers: { "Content-Type": "application/json", "X-Auth-Token": token },
    url: `${process.env.REACT_APP_API}/item/create/${userId}`,
    data: item,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const updateItem = (itemId, userId, item, token) => {
  return axios({
    method: "put",
    headers: { "Content-Type": "application/json", "X-Auth-Token": token },
    url: `${process.env.REACT_APP_API}/item/update/${itemId}/${userId}`,
    data: item,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const updateHours = (hours, bizId, userId, token) => {
  return axios({
    method: "put",
    headers: { "Content-Type": "application/json", "X-Auth-Token": token },
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

export const deleteItem = (itemId, userId, token) => {
  return axios({
    method: "delete",
    headers: {
      "X-Auth-Token": token,
    },
    url: `${process.env.REACT_APP_API}/item/delete/${itemId}/${userId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createBiz = (biz, userId, token) => {
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    url: `${process.env.REACT_APP_API}/biz/create/${userId}`,
    data: biz,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const updateBiz = (biz, bizId, userId, token) => {
  console.log("API CORE BIZ", biz);
  return axios({
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    url: `${process.env.REACT_APP_API}/biz/update/${bizId}/${userId}`,
    data: biz,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const deleteBiz = (bizId, userId, token) => {
  return axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}/biz/${bizId}/${userId}`,
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};
