import React from "react";
import { Container, Form } from "react-bootstrap";

const Filters = ({ categories, setBizCat }) => {
  const handleChange = (e) => {
    setBizCat(e.target.value);
  };

  return (
    <Container className="d-flex mb-3 text-secondary">
      <i className="fas fa-sort mr-3 fa-2x"></i>
      <Form.Control as="select" size="lg" onChange={handleChange}>
        <option value={"All"}>Show All Categories</option>
        {categories.map((cat, i) => (
          <option value={cat._id} key={i}>
            {cat.name}
          </option>
        ))}
      </Form.Control>
      <br />
    </Container>
  );
};

export default Filters;
