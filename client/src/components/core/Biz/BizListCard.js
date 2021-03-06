import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import StarRating from "../Layout/StarRating";
import { MDBBadge } from "mdbreact";

const BizListCard = ({ biz }) => {
  const { name, description, rating, photo, category, _id } = biz;

  return (
    <Card style={{ width: "20rem", height: "100%" }}>
      <Card.Img variant="top" src={photo} style={{ height: "190px" }} />
      <Card.Body>
        <Card.Title>
          {name.length > 25 ? name.substring(0, 25) + "..." : name}
        </Card.Title>
        <div className="d-flex justify-content-between mb-2">
          <MDBBadge pill color={category.color}>
            {category.name}
          </MDBBadge>
          {/* <StarRating rating={rating} /> */}
        </div>

        <Card.Text style={{ height: "100px" }}>
          {description.length > 140
            ? description.substring(0, 130) + "..."
            : description}
        </Card.Text>
        <Row>
          <Col>
            <Button
              style={{ height: "100%", paddingTop: "10px" }}
              block
              variant="secondary"
              href={`/biz/${_id}`}
            >
              <i className="fas fa-store-alt fa-2x"></i>
              <br />
              Shop
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BizListCard;
