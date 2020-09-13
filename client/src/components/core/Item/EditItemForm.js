import React, { useState, useEffect } from "react";
import { Form, Col, Button, Alert, Image } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { updateItem, getItem } from "../apiCore";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  inStock: yup.bool(),
  canDeliver: yup.bool(),
});
const EditItemForm = ({
  itemId,
  authUserId,
  token,
  setShowEditModal,
  itemsUpdated,
  setItemsUpdated,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    inStock: true,
    canDeliver: true,
    photo: null,
  });
  const [newPhoto, setNewPhoto] = useState(false);

  useEffect(() => {
    getItem(itemId).then((i) => setItem(i));
    //eslint-disable-next-line
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

  const showFileName = (photo) =>
    photo && (
      <Alert variant="info" className="mt-3">
        <span className="text-success">{photo.name}</span> Selected
      </Alert>
    );

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("inStock", values.inStock);
        formData.append("canDeliver", values.canDeliver);

        if (values.photo) {
          formData.append("photo", values.photo);
        }
        const response = await updateItem(itemId, authUserId, formData, token);
        if (response.error) {
          setError(response.error);
          setLoading(false);
        } else {
          setLoading(false);
          setShowEditModal(false);
          setItemsUpdated(!itemsUpdated);
        }
      }}
      initialValues={{
        name: item.name,
        description: item.description,
        price: item.price,
        inStock: item.inStock,
        canDeliver: item.canDeliver,
        photo: item.photo,
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
                Please Enter an Item Name
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Second Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="description..."
                name="description"
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
                isInvalid={!!errors.description && touched.description}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Please Enter an Item Description
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
              <Form.Group as={Col} md="12" controlId="validationFormik05">
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
            {!newPhoto && (
              <>
                <h6>Current Photo</h6>
                <Image src={values.photo} thumbnail fluid className="my-2" />
              </>
            )}

            <Form.Group as={Col} md="12" controlId="validationFormik06">
              <Form.Label>Profile Photo</Form.Label>
              <Form.File
                id="custom-file"
                name="photo"
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                  setNewPhoto(true);
                }}
              />

              {newPhoto && showFileName(values.photo)}
            </Form.Group>
          </Form.Row>
          {/*  Button Row */}
          {loading && <Loading loading={loading} />}
          {showError()}
          <Form.Row>
            <Button className="my-3" block type="submit">
              Save Changes
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default EditItemForm;
