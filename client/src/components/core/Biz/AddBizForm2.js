import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Container, Col, Row, Button, Alert } from "react-bootstrap";
import Loading from "../Layout/Loading";

import { createBiz, getCategories } from "../apiCore";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
});
const AddBizForm2 = ({ authUser }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const showError = () => (
    <Alert
      variant="danger"
      className="mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => createBiz(values, authUser._id)}
      initialValues={{
        name: "",
        description: "",
        category: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="mt-4">
          {/* First Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name..."
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name && touched.name}
              />

              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Second Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="description..."
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={!!errors.description && touched.description}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik04">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                placeholder="Category..."
                name="category"
                value={values.category}
                onChange={handleChange}
                isValid={touched.category && !errors.category}
                isInvalid={!!errors.category && touched.category}
              >
                <option value={""}>Choose a Category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/*  Button Row */}
          {/* <Loading loading={loading} /> */}
          {showError()}
          <Form.Row>
            <Button className="my-3" block type="submit">
              Continue
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddBizForm2;
