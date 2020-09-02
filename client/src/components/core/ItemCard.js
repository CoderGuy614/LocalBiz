import React, { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";

const ItemCard = ({ item, itemsUpdated, setItemsUpdated }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const translateBool = (bool) => {
    return bool ? "Yes" : "False";
  };
  const { name, description, photo, price, inStock, canDeliver, _id } = item;

  const handleEditItem = () => {
    console.log(`EDIT ITEM ${_id} `);
    setShowEdit(true);
  };

  const handleDeleteItem = () => {
    setShowDelete(true);

    // Open a delete Item Modal
    // Pass the item ID Into the Modal
    // The modal will have a function imported from apiCore that will send the delete request to server, passing the item id
  };

  return (
    <Row className="m-2 border rounded">
      <Col xs={4}>
        <Row className="d-flex align-items-center">
          <Image src={photo} thumbnail fluid />
        </Row>
        <Row>
          <Button
            onClick={handleEditItem}
            style={{ width: "50%" }}
            variant="dark"
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteItem}
            style={{ width: "50%" }}
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
      <EditModal id={_id} showEdit={showEdit} setShowEdit={setShowEdit} />
    </Row>
  );
};

export default ItemCard;
