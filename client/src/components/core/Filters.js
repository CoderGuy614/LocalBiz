import React from "react";
import { Container, Form } from "react-bootstrap";

const Filters = ({ categories }) => {
  return (
    <Container className="d-flex mb-2 text-secondary">
      <i className="fas fa-sort mr-3 fa-2x"></i>
      <Form.Control as="select" size="lg">
        <option>Choose a Category</option>
        {categories.map((cat, i) => (
          <option key={i}>{cat.name}</option>
        ))}
      </Form.Control>
      <br />
    </Container>
  );
};

export default Filters;
