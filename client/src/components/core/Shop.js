import React, { useState, useEffect, useContext } from "react";
import Layout from "./Layout/Layout";
import { Container, Button, Alert, Spinner } from "react-bootstrap";
import { getBusinesses, getCategories } from "./apiCore";
import AddBizModal from "./Biz/AddBizModal";
import Filters from "./Layout/Filters";
import BizListCard from "./Biz/BizListCard";
import AuthContext from "../../context/auth/authContext";

const Shop = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, token } = authContext;
  const authUser = authContext.user;
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bizCat, setBizCat] = useState("All");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadBusinesses = () => {
    setLoading(true);
    getBusinesses(bizCat).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else if (data.length === 0) {
        setAlert("No Businesses Found for this Category");
        setBusinesses(data);
        setLoading(false);
      } else {
        bizCat !== "All"
          ? setAlert(
              `Showing ${data.length} Businesses for ${data[0].category.name}`
            )
          : setAlert(`Showing ${data.length} Businesses from All Categories`);

        setBusinesses(data);
        setLoading(false);
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
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line
  }, [showAddModal]);

  useEffect(() => {
    loadBusinesses();
    // eslint-disable-next-line
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

  const showLoading = () => (
    <div className="d-flex justify-content-center my-4">
      <Spinner
        style={{ display: loading ? "" : "none" }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  const showAddButton = () => {
    if (authUser) {
      return (
        <Button
          variant="secondary"
          block
          // style={{ display: authUser ? "" : "none" }}
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus-square mr-2"></i>
          Create New Business
        </Button>
      );
    }
  };

  return (
    <Layout
      title="LocalBiz"
      description="Browse Local Businesses"
      // photo={
      //   "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png"
      // }
    >
      <Container fluid>
        <Filters categories={categories} setBizCat={setBizCat} />
        {showError()}
        {showAlert()}
        {showLoading()}
        {showAddButton()}
        <Container fluid className="d-flex flex-wrap justify-content-center">
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
        authUser={authUser}
        token={token}
      />
    </Layout>
  );
};

export default Shop;
