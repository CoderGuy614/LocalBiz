import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Layout from "./Layout";

const AddBizForm = () => {
  const [values, setValues] = useState({
    bizName: "",
    description: "",
    bizEmail: "",
    bizPhone: "",
    photo: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: "", [name]: e.target.value });
  };

  const {
    bizName,
    description,
    bizEmail,
    bizPhone,
    photo,
    error,
    success,
  } = values;
  return (
    <Layout title="Post A New Business" description="Enter Details Below">
      <Container className="mb-3">
        <h3>Step 1: Create your Business Profile.</h3>
        <Form>
          <Form.Group>
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Business Name"
              value={bizName}
              onChange={handleChange("bizName")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={handleChange("description")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Business Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={bizEmail}
              onChange={handleChange("bizEmail")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              value={bizPhone}
              onChange={handleChange("bizPhone")}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              label="Profile Photo"
              value={photo}
              onChange={handleChange("photo")}
            />
          </Form.Group>
          <Button type="submit" block>
            {" "}
            Continue to Add Items
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default AddBizForm;
