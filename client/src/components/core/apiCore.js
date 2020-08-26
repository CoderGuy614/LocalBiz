export const getBusinesses = () => {
  return fetch(`${process.env.REACT_APP_API}/biz/list`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
