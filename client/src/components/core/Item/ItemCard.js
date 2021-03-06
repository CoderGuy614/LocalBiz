import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { createMessage } from "../apiCore";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Tabs,
  Tab,
  Form,
  Spinner,
} from "react-bootstrap";

const ItemCard = ({
  item,
  itemsUpdated,
  setItemsUpdated,
  token,
  bizId,
  isAuthenticated,
  authUserId,
  bizOwner,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [text, setText] = useState("");

  const translateBool = (bool) => {
    return bool ? "Yes" : "No";
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = () => {
    if (isAuthenticated && text.length > 0) {
      setLoading(true);
      const payload = { text };
      createMessage(item._id, authUserId, bizOwner._id, payload, token)
        .then((msg) => {
          if (msg) {
            setText("");
            handleSuccess();
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const showButtonSpinner = () => {
    if (loading) {
      return (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      );
    }
  };

  const setButtonText = () => {
    if (!isAuthenticated) {
      return "Please Login To Send Messages";
    }
    if (loading) {
      return "";
    }
    if (success) {
      return "Message Sent!";
    } else {
      return "Send";
    }
  };

  const { name, description, photo, price, inStock, canDeliver, _id } = item;

  return (
    <Row className="m-2 border rounded w-100">
      <Col xs={4}>
        <Row className="d-flex">
          <Image className="m-2" src={photo} thumbnail fluid />
        </Row>
        <Row className="m-1 d-flex flex-nowrap">
          <Button
            onClick={() => setShowEditModal(true)}
            className={`ml-1 w-auto text-center ${
              bizOwner && authUserId && bizOwner._id === authUserId
                ? "d-flex"
                : "d-none"
            }`}
            variant="dark"
          >
            <i className="fas fa-edit mx-2"></i>
            <span className="d-none d-lg-block">Edit</span>
          </Button>
          <Button
            onClick={() => setShowDelete(true)}
            className={`ml-1 w-auto text-center ${
              bizOwner && authUserId && bizOwner._id === authUserId
                ? "d-flex"
                : "d-none"
            }`}
            variant="danger"
          >
            <i className="fas fa-trash-alt mx-2 w-auto"></i>
            <span className="d-none d-lg-block">Delete</span>
          </Button>
        </Row>
      </Col>
      <Col xs={8}>
        <Tabs defaultActiveKey="info" id="tab01" className="my-2">
          <Tab eventKey="info" title="Info">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Name:</strong> {name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {description}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: $</strong> {price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>In Stock:</strong> {translateBool(inStock)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Delivery Available:</strong> {translateBool(canDeliver)}
              </ListGroup.Item>
            </ListGroup>
          </Tab>
          <Tab eventKey="contact" title="Contact Seller">
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter a message..."
                value={text}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              disabled={!isAuthenticated || !text || success}
              className="btn-secondary btn-sm mb-2"
              variant={success ? "success" : "secondary"}
              onClick={handleSendMessage}
            >
              {showButtonSpinner()}
              {setButtonText()}
            </Button>
          </Tab>
        </Tabs>
      </Col>
      <DeleteModal
        itemId={_id}
        authUserId={authUserId}
        token={token}
        showDelete={showDelete}
        itemsUpdated={itemsUpdated}
        setItemsUpdated={setItemsUpdated}
        setShowDelete={setShowDelete}
      />
      <EditModal
        itemId={_id}
        authUserId={authUserId}
        token={token}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        itemsUpdated={itemsUpdated}
        setItemsUpdated={setItemsUpdated}
      />
    </Row>
  );
};

export default ItemCard;
