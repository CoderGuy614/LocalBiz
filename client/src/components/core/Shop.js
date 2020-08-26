import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getBusinesses, getCategories } from "./apiCore";
import { Button } from "react-bootstrap";

const Shop = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const loadBusinesses = () => {
    getBusinesses().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setBusinesses(data);
      }
    });
  };
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadCategories();
    loadBusinesses();
  }, []);

  return (
    <Layout
      title="LocalBiz"
      description="Browse Local Businesses in your city."
    ></Layout>
  );
};

export default Shop;
