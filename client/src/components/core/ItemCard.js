import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

const ItemCard = ({ item, itemsUpdated, setItemsUpdated }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const translateBool = (bool) => {
    return bool ? "Yes" : "No";
  };
  const { name, description, photo, price, inStock, canDeliver, _id } = item;

  return (
    <Row className="m-2 border rounded">
      <Col xs={4}>
        <Row className="d-flex align-items-center">
          <Image src={photo} thumbnail fluid />
        </Row>
        <Row className="m-2 d-flex justify-content-center">
          <Button
            onClick={() => setShowEdit(true)}
            className="item-card-button w-auto mx-1"
            variant="dark"
          >
            Edit
          </Button>
          <Button
            onClick={() => setShowDelete(true)}
            className="item-card-button w-auto mx-1"
            variant="danger"
          >
            Delete
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
        id={_id}
        showDelete={showDelete}
        itemsUpdated={itemsUpdated}
        setItemsUpdated={setItemsUpdated}
        setShowDelete={setShowDelete}
      />
      <EditModal
        id={_id}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        itemsUpdated={itemsUpdated}
        setItemsUpdated={setItemsUpdated}
      />
    </Row>
  );
};

export default ItemCard;
