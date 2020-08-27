import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

const ItemCard = ({ item }) => {
  const translateBool = (bool) => {
    return bool ? "Yes" : "False";
  };
  const { name, description, photo, price, inStock, canDeliver, _id } = item;

  return (
    <Card style={{ width: "14rem" }}>
      <Card.Img variant="top" src={photo} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <ListGroup variant="flush">
          <ListGroup.Item>Price: {price}</ListGroup.Item>
          <ListGroup.Item>In Stock: {translateBool(inStock)}</ListGroup.Item>
          <ListGroup.Item>
            Delivery Available: {translateBool(canDeliver)}
          </ListGroup.Item>
        </ListGroup>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
