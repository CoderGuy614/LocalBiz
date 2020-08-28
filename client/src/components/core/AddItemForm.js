import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import Layout from "./Layout";

const AddItemForm = () => {
  return (
    <Layout title="Add a New Item" description="Enter Item Details Below">
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Item Name"></Form.Control>
          </Form.Group>
        </Form>
      </Container>
    </Layout>
  );
};

export default AddItemForm;
