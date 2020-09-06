import React, { useState, useEffect, useContext } from "react";
import { getBusiness, getItems } from "../apiCore";
import { Row, Col, Container, Button } from "react-bootstrap";
import AuthContext from "../../../context/auth/authContext";
import AddItemModal from "../Item/AddItemModal";
import BizSidebar from "./BizSidebar";
import ItemCard from "../Item/ItemCard";
import Layout from "../Layout/Layout";

const Biz = ({ match }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;
  const authUser = authContext.user;
  const { id } = match.params;
  const [authUserId, setAuthUserId] = useState("");
  const [business, setBusiness] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hoursUpdated, setHoursUpdated] = useState(false);
  const [itemsUpdated, setItemsUpdated] = useState(false);
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const loadBusiness = () => {
    getBusiness(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setBusiness(data);
      }
    });
  };

  const loadItems = () => {
    getItems(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setItems(data);
      }
    });
  };

  useEffect(() => {
    loadUser();
    if (authUser) {
      setAuthUserId(authUser._id);
    } else {
      setAuthUserId("");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadItems();
  }, [itemsUpdated]);

  useEffect(() => {
    loadBusiness();
  }, [hoursUpdated, settingsUpdated]);

  const { name, description, photo, user, _id } = business;

  return (
    <Layout title={name} description={description} photo={photo} user={user}>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Row>
              <BizSidebar
                business={business}
                authUserId={authUserId}
                hoursUpdated={hoursUpdated}
                setHoursUpdated={setHoursUpdated}
                settingsUpdated={settingsUpdated}
                setSettingsUpdated={setSettingsUpdated}
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
              {items.length > 0 ? (
                items.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    itemsUpdated={itemsUpdated}
                    setItemsUpdated={setItemsUpdated}
                    authUserId={authUserId}
                    bizOwner={user}
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
      </Container>
      <AddItemModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        itemsUpdated={itemsUpdated}
        setItemsUpdated={setItemsUpdated}
        bizId={id}
        userId={authUserId}
      />
    </Layout>
  );
};

export default Biz;
