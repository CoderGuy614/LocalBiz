import axios from "axios";

const API_URL = "https://localbiz-2a56a.cloudfunctions.net/api";

export const getBusinesses = (bizCat) => {
  return axios({
    method: "get",
    url: `${API_URL}/biz/list?category=${bizCat}`,
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
    url: `${API_URL}/biz/${id}`,
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
    url: `${API_URL}/items/${bizId}`,
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
    url: `${API_URL}/item/${itemId}`,
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
    url: `${API_URL}/categories/list`,
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
    url: `${API_URL}/item/create/${userId}`,
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
    url: `${API_URL}/item/update/${itemId}/${userId}`,
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
    url: `${API_URL}/biz/hours/${bizId}/${userId}`,
    data: JSON.stringify(hours),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

// export const getCurrentLocation = (token) => {
//   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//   const googleUrl = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GEOLOCATION_API_KEY}`;
//   return axios({
//     method: "post",
//     headers: { "X-Auth-Token": token },
//     url: proxyUrl + googleUrl,
//   })
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
// };

export const updateLocation = (location, bizId, userId, token) => {
  return axios({
    method: "put",
    headers: { "Content-Type": "application/json", "X-Auth-Token": token },
    url: `${API_URL}/biz/location/${bizId}/${userId}`,
    data: JSON.stringify(location),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getHours = (bizId) => {
  return axios({
    method: "get",
    url: `${API_URL}/biz/hours/${bizId}`,
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
    url: `${API_URL}/item/delete/${itemId}/${userId}`,
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
    url: `${API_URL}/biz/create/${userId}`,
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
  return axios({
    method: "put",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    url: `${API_URL}/biz/update/${bizId}/${userId}`,
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
    url: `${API_URL}/biz/${bizId}/${userId}`,
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};

export const createMessage = (itemId, fromUserId, toUserId, text, token) => {
  return axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    url: `${API_URL}/messages/create/${itemId}/${fromUserId}/${toUserId}`,
    data: text,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getMessagesByUser = (authUserId, token) => {
  return axios({
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    url: `${API_URL}/messages/${authUserId}`,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
