import React, { useState, useEffect, useContext } from "react";
import { getBusiness, getItems } from "../apiCore";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import AuthContext from "../../../context/auth/authContext";
import AddItemModal from "../Item/AddItemModal";
import BizSidebar from "./BizSidebar";
import ItemCard from "../Item/ItemCard";
import Layout from "../Layout/Layout";

const Biz = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser, token } = authContext;
  const authUser = authContext.user;
  const { bizId } = match.params;
  const [authUserId, setAuthUserId] = useState("");
  const [business, setBusiness] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hoursUpdated, setHoursUpdated] = useState(false);
  const [itemsUpdated, setItemsUpdated] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [locationUpdated, setLocationUpdated] = useState(false);
  const loadBusiness = () => {
    getBusiness(bizId).then((data) => {
      setBusiness(data);
    });
  };

  const loadItems = () => {
    getItems(bizId).then((data) => {
      setItems(data);
    });
  };

  useEffect(() => {
    loadUser();
    if (authUser) {
      setAuthUserId(authUser._id);
    } else {
      setAuthUserId("");
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    loadItems();
    //eslint-disable-next-line
  }, [itemsUpdated]);

  useEffect(() => {
    loadBusiness();
    //eslint-disable-next-line
  }, [hoursUpdated, settingsUpdated, locationUpdated]);

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const { name, description, photo, user } = business;

  return (
    <Layout title={name} description={description} photo={photo} user={user}>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Row>
              <BizSidebar
                business={business}
                authUserId={authUserId}
                token={token}
                hoursUpdated={hoursUpdated}
                setHoursUpdated={setHoursUpdated}
                settingsUpdated={settingsUpdated}
                setSettingsUpdated={setSettingsUpdated}
                locationUpdated={locationUpdated}
                setLocationUpdated={setLocationUpdated}
              />
            </Row>
          </Col>
          <Col md={9}>
            {user && authUserId && authUserId === user._id && (
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(true)}
                block
              >
                <i className="fas fa-plus-square mr-2"></i>
                Add An Item
              </Button>
            )}

            <Row className="d-flex justify-content-center">
              {items && items.length > 0 ? (
                items.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    token={token}
                    itemsUpdated={itemsUpdated}
                    setItemsUpdated={setItemsUpdated}
                    authUserId={authUserId}
                    isAuthenticated={isAuthenticated}
                    bizOwner={user}
                    bizId={bizId}
                  />
                ))
              ) : (
                <div className="text-center mt-4">
                  <h3>No Items to Show</h3>
                </div>
              )}
            </Row>
          </Col>
        </Row>
        {showError()}
      </Container>
      <AddItemModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        itemsUpdated={itemsUpdated}
        setItemsUpdated={setItemsUpdated}
        bizId={bizId}
        userId={authUserId}
        token={token}
      />
    </Layout>
  );
};

export default Biz;
