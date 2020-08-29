import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { createBiz, getCategories } from "./apiCore";
import Layout from "./Layout";

const AddBizForm = () => {
  const [values, setValues] = useState({
    name: "",
    category: "",
    description: "",
    bizEmail: "",
    bizPhone: "",
    photo: "",
    error: "",
    categories: [],
    loading: false,
    redirect: false,
    newBizId: "",
    formData: "",
  });

  const [photoName, setPhotoName] = useState("");

  const {
    name,
    description,
    bizEmail,
    bizPhone,
    photo,
    category,
    categories,
    redirect,
    newBizId,
    loading,
    error,
    formData,
  } = values;

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      setPhotoName(e.target.files[0].name);
    }
    formData.set(name, value);
    setValues({ ...values, error: "", [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBiz(formData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          bizEmail: "",
          bizPhone: "",
          category: "",
          loading: false,
          error: "",
          redirect: true,
          newBizId: data._id,
        });
      }
    });
  };

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showLoading = () => loading && <Alert variant="info">Loading...</Alert>;

  const showFileName = (fileName) =>
    photoName && (
      <Alert variant="info">
        <span className="text-success">{photoName}</span> Selected
      </Alert>
    );

  const redirectUser = () => {
    if (redirect && !error) {
      return <Redirect to={`/biz/${newBizId}`} />;
    }
  };

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
              value={name}
              onChange={handleChange("name")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              type="large"
              value={category}
              onChange={handleChange("category")}
            >
              <option>Choose a Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
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
            <Form.Label>Profile Photo</Form.Label>
            <Form.File
              id="custom-file"
              label="Choose a Photo"
              name={photo}
              onChange={handleChange("photo")}
              custom
            />
          </Form.Group>
          {showFileName()}
          {showError()}
          {showLoading()}
          {redirectUser()}
          <Button type="submit" onClick={handleSubmit} block>
            {" "}
            Continue to Add Items
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default AddBizForm;
