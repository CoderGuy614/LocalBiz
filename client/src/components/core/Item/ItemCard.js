import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

const ItemCard = ({
  item,
  itemsUpdated,
  setItemsUpdated,
  token,
  authUserId,
  bizOwner,
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const translateBool = (bool) => {
    return bool ? "Yes" : "No";
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
        <ListGroup variant="flush">
          <ListGroup.Item>Name: {name}</ListGroup.Item>
          <ListGroup.Item>Description: {description}</ListGroup.Item>
          <ListGroup.Item>Price: $ {price}</ListGroup.Item>
          <ListGroup.Item>In Stock: {translateBool(inStock)}</ListGroup.Item>
          <ListGroup.Item>
            Delivery Available: {translateBool(canDeliver)}
          </ListGroup.Item>
        </ListGroup>
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
