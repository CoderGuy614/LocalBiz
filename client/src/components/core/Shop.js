import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Container, Button } from "react-bootstrap";
import { getBusinesses, getCategories } from "./apiCore";
import Filters from "./Filters";
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
      <Container fluid>
        <Filters categories={categories} />
        <Button block href="/post/biz">
          Create New Business
        </Button>
        <Container fluid className="d-flex flex-wrap">
          {businesses &&
            businesses.map((biz, i) => (
              <div key={i} className="m-3">
                <BizListCard
                  name={biz.name}
                  description={biz.description}
                  photo={biz.photo}
                  rating={biz.rating}
                  id={biz._id}
                />
              </div>
            ))}
        </Container>
      </Container>
    </Layout>
  );
};

export default Shop;
