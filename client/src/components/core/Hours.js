import React from "react";
import { ListGroup } from "react-bootstrap";

const Hours = ({ hours }) => {
  return (
    <>
      <h5 className="text-center mt-3">Hours of Operation</h5>
      <ListGroup>
        <ListGroup.Item>Monday: 8am - 8pm</ListGroup.Item>
        <ListGroup.Item>Tuesday: 8am - 8pm</ListGroup.Item>
        <ListGroup.Item>Wednesday: 8am - 8pm</ListGroup.Item>
        <ListGroup.Item>Thursday: 8am - 8pm</ListGroup.Item>
        <ListGroup.Item>Friday: 8am - 8pm</ListGroup.Item>
        <ListGroup.Item>Saturday: 10am - 6pm</ListGroup.Item>
        <ListGroup.Item>Sunday: Closed</ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Hours;
