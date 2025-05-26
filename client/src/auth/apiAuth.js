import axios from '../config/axios';


export const signup = (user) => {
  return axios({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/api/signup`,
    data: JSON.stringify(user),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const signin = (user) => {
  return axios({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `/api/signin`,
    data: JSON.stringify(user),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const setJwt = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    return axios({
      method: "post",
      url: `/api/signout`,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
};
