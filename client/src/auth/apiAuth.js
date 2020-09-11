import axios from "axios";

export const signup = (user) => {
  return fetch(`${process.env.REACT_APP_API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return axios({
    method: "post",
    headers: { "Content-Type": "application/json" },
    url: `${process.env.REACT_APP_API}/signin`,
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
    return fetch(`${process.env.REACT_APP_API}/signout`, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};
