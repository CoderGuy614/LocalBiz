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

// export const updateHours = (hours) => {
//   console.log("The NEW HOURS", hours);
//   return fetch(
//     `${process.env.REACT_APP_API}/biz/hours/5f486d70c670fe40cef6d353/5f4493e81ab0002d9945e5b8`,
//     {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//       },
//       body: JSON.stringify(hours),
//     }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// };

export const updateHours = (hours) => {
  return axios({
    method: "put",
    headers: { "Content-Type": "application/json" },
    url: `${process.env.REACT_APP_API}/biz/hours/5f486d70c670fe40cef6d353/5f4493e81ab0002d9945e5b8`,
    data: JSON.stringify(hours),
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(err));
};
