import React from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";

const ItemCardHorizontal = ({ item }) => {
  const translateBool = (bool) => {
    return bool ? "Yes" : "False";
  };
  const { name, description, photo, price, inStock, canDeliver, _id } = item;
  return (
    <Row className="m-2 border rounded">
      <Col xs={4} className="d-flex align-items-center">
        <Image src={photo} thumbnail fluid />
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
    </Row>
  );
};

export default ItemCardHorizontal;
