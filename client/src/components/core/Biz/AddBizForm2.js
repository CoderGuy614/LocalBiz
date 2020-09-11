import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Loading from "../Layout/Loading";
import { createBiz, getCategories } from "../apiCore";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  bizPhone: yup.string().required(),
  bizEmail: yup.string().email().required(),
});
const AddBizForm2 = ({ authUser }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [redirectId, setRedirectId] = useState("");

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

  const redirectUser = () => {
    if (redirectId && !error) {
      return <Redirect to={`/biz/${redirectId}`} />;
    }
  };

  const showFileName = (photo) =>
    photo && (
      <Alert variant="info" className="mt-3">
        <span className="text-success">{photo.name}</span> Selected
      </Alert>
    );

  return (
    <Formik
      validationSchema={schema}
      onSubmit={async (values) => {
        console.log("VALUES", values);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("bizEmail", values.bizEmail);
        formData.append("bizPhone", values.bizPhone);
        if (values.photo) {
          formData.append("photo", values.photo);
        }
        const response = await createBiz(formData, authUser._id);
        if (response.error) {
          setError(response.error);
        } else {
          console.log("RESOPOSNE", response);
          setRedirectId(response._id);
        }
      }}
      initialValues={{
        name: "",
        description: "",
        category: "",
        bizEmail: "",
        bizPhone: "",
        photo: null,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
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
                Please Enter the Name of Your Business
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
                Please Enter a Description
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Third Row */}
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationFormik04">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                type="large"
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
                Please Choose a Category
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Fourth Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Business Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="bizPhone"
                placeholder="Phone..."
                value={values.bizPhone}
                onChange={handleChange}
                isValid={touched.bizPhone && !errors.bizPhone}
                isInvalid={!!errors.bizPhone && touched.bizPhone}
              />

              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Phone Number is Required
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Fifth Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Business Email</Form.Label>
              <Form.Control
                type="email"
                name="bizEmail"
                placeholder="Email..."
                value={values.bizEmail}
                onChange={handleChange}
                isValid={touched.bizEmail && !errors.bizEmail}
                isInvalid={!!errors.bizEmail && touched.bizEmail}
              />

              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Sixth Row  - File Upload */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Profile Photo</Form.Label>
              <Form.File
                id="custom-file"
                name="photo"
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                }}
              />
              {showFileName(values.photo)}
            </Form.Group>
          </Form.Row>
          {/*  Button Row */}
          {/* <Loading loading={loading} /> */}
          {showError()}
          {redirectUser()}
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
