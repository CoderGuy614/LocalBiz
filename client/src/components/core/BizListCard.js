import React from "react";
import { Card, Button } from "react-bootstrap";

const BizListCard = ({ name, description, photo, id }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={photo} style={{ maxHeight: "200px" }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button block variant="primary" href={`/biz/${id}`}>
          See Items
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BizListCard;
