import React, { useState, useEffect } from "react";
import { Form, Col, Button, Alert, Image } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { getBusiness, updateBiz, deleteBiz } from "../apiCore";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  bizEmail: yup.string().email().required(),
  bizPhone: yup.string().required(),
});
const EditSettingsForm2 = ({
  bizId,
  authUserId,
  settingsUpdated,
  setSettingsUpdated,
  setShowSettingsModal,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [biz, setBiz] = useState({
    name: "",
    description: "",
    bizEmail: "",
    bizPhone: "",
    photo: null,
  });
  const [newPhoto, setNewPhoto] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBusiness(bizId)
      .then((b) => {
        setBiz(b);
        setLoading(false);
      })
      .catch((err) => setError(err));
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
        console.log("VALUES", values);
        setLoading(true);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("bizEmail", values.bizEmail);
        formData.append("bizPhone", values.bizPhone);
        if (values.photo) {
          formData.append("photo", values.photo);
        }
        for (var key of formData.entries()) {
          console.log(key[0] + ", " + key[1]);
        }
        const response = await updateBiz(formData, bizId, authUserId);
        if (response.error) {
          setError(response.error);
          setLoading(false);
        } else {
          setLoading(false);
          setShowSettingsModal(false);
          setSettingsUpdated(!settingsUpdated);
        }
      }}
      initialValues={{
        name: biz.name,
        description: biz.description,
        bizEmail: biz.bizEmail,
        bizPhone: biz.bizPhone,
        photo: biz.photo,
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
                Please Enter a Name
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Second Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
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
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Email Address...</Form.Label>
              <Form.Control
                type="email"
                placeholder="Business Email..."
                name="bizEmail"
                value={values.bizEmail}
                onChange={handleChange}
                isValid={touched.bizEmail && !errors.bizEmail}
                isInvalid={!!errors.bizEmail && touched.bizEmail}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Please Enter your Business Email Address
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Fourth Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Business Phone #..."
                name="bizPhone"
                value={values.bizPhone}
                onChange={handleChange}
                isValid={touched.bizPhone && !errors.bizPhone}
                isInvalid={!!errors.bizPhone && touched.bizPhone}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Please Enter your Business Phone Number
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Fifth Row  - File Upload */}
          <Form.Row>
            {!newPhoto && (
              <>
                <h6>Current Photo</h6>
                <Image src={biz.photo} thumbnail fluid className="my-2" />
              </>
            )}

            <Form.Group as={Col} md="12" controlId="validationFormik01">
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

export default EditSettingsForm2;
