import React, { useState } from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { createItem } from "../apiCore";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required().max(200),
  description: yup.string().required().max(1000),
  price: yup.number().required(),
  inStock: yup.bool(),
  canDeliver: yup.bool(),
});
const AddItemForm = ({ bizId, userId, setSuccess, token }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const showError = () => (
    <Alert
      variant="danger"
      className="mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

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
        setLoading(true);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("inStock", values.inStock);
        formData.append("canDeliver", values.canDeliver);
        formData.append("business", bizId);

        if (values.photo) {
          formData.append("photo", values.photo);
        }
        const response = await createItem(formData, userId, token);
        if (response.error) {
          setError(response.error);
          setLoading(false);
        } else {
          setLoading(false);
          setSuccess(true);
        }
      }}
      initialValues={{
        name: "",
        description: "",
        price: "",
        inStock: true,
        canDeliver: true,
        photo: null,
      }}
    >
      {({
        handleSubmit,
        handleChange,
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
                "Please Enter an Item Name (Max. 200 characters)"
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
                "Please Enter an Item Description (Max. 1000 characters)"
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Third Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Price ($USD)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price..."
                name="price"
                value={values.price}
                onChange={handleChange}
                isValid={touched.price && !errors.price}
                isInvalid={!!errors.price && touched.price}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Please Enter item Price in $USD
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Fourth Row */}
          <Form.Row>
            <Col>
              <Form.Group as={Col} md="12" controlId="validationFormik04">
                <Form.Label>In Stock / Available Now</Form.Label>
                <Form.Control
                  as="select"
                  name="inStock"
                  value={values.inStock}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} md="12" controlId="validationFormik04">
                <Form.Label>Delivery Available</Form.Label>
                <Form.Control
                  as="select"
                  name="canDeliver"
                  value={values.canDeliver}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Form.Row>
          {/* Fifth Row  - File Upload */}
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
          {loading && <Loading loading={loading} />}
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

export default AddItemForm;
