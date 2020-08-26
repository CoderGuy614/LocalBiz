import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Container } from "react-bootstrap";
import { getBusinesses, getCategories } from "./apiCore";
import BizListCard from "./BizListCard";

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
    >
      <Container>
        {businesses &&
          businesses.map((biz, i) => (
            <div key={i} className="mb-3">
              <BizListCard
                name={biz.name}
                description={biz.description}
                photo={biz.photo}
                id={biz._id}
              />
            </div>
          ))}
      </Container>
    </Layout>
  );
};

export default Shop;
