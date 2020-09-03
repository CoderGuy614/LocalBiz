import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import { Container, Button } from "react-bootstrap";
import { getBusinesses, getCategories } from "./apiCore";
import AddBizModal from "./Biz/AddBizModal";
import Filters from "./Layout/Filters";
import BizListCard from "./Biz/BizListCard";

const Shop = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

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
        <Button variant="secondary" block onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus-square mr-2"></i>
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
      <AddBizModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
    </Layout>
  );
};

export default Shop;
