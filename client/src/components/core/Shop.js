import React, { useState, useEffect } from "react";
import Layout from "./Layout/Layout";
import { Container, Button, Alert } from "react-bootstrap";
import { getBusinesses, getCategories } from "./apiCore";
import AddBizModal from "./Biz/AddBizModal";
import Filters from "./Layout/Filters";
import BizListCard from "./Biz/BizListCard";

const Shop = () => {
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bizCat, setBizCat] = useState("All");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const loadBusinesses = () => {
    getBusinesses(bizCat).then((data) => {
      if (data.error) {
        setError(data.error);
      } else if (data.length === 0) {
        setAlert("No Businesses Found for this Category");
        setBusinesses(data);
      } else {
        bizCat !== "All"
          ? setAlert(
              `Showing ${data.length} Businesses for ${data[0].category.name}`
            )
          : setAlert(`Showing ${data.length} Businesses from All Categories`);

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
  }, [bizCat]);

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showAlert = () => (
    <Alert variant="primary" style={{ display: alert ? "" : "none" }}>
      {alert}
    </Alert>
  );

  return (
    <Layout
      title="LocalBiz"
      description="Browse Local Businesses in your city."
    >
      <Container fluid>
        <Filters categories={categories} setBizCat={setBizCat} />
        {showError()}
        {showAlert()}
        <Button variant="secondary" block onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus-square mr-2"></i>
          Create New Business
        </Button>
        <Container fluid className="d-flex flex-wrap">
          {businesses &&
            businesses.map((biz, i) => (
              <div key={i} className="m-3">
                <BizListCard biz={biz} />
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
