import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import StarRating from "./StarRating";

const BizListCard = ({ name, description, rating, photo, id }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={photo} style={{ maxHeight: "200px" }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Row>
          <Col>
            <Button
              style={{ height: "100%", paddingTop: "15%" }}
              block
              variant="secondary"
              href={`/biz/${id}`}
            >
              <i className="fas fa-store-alt fa-2x"></i>
              <br />
              Shop
            </Button>
          </Col>
          <Col>
            <StarRating rating={rating} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BizListCard;
