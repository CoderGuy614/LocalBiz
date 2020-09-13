import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Alert,
  Image,
} from "react-bootstrap";
import Loading from "../Layout/Loading";
import { getBusiness, updateBiz, deleteBiz } from "../apiCore";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required().max(20),
  description: yup.string().required(),
  bizEmail: yup.string().email().required(),
  bizPhone: yup.string().required(),
  bizAddress: yup.string(),
});
const EditSettingsForm = ({
  bizId,
  authUserId,
  token,
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
    bizAddress: "",
    photo: null,
  });
  const [newPhoto, setNewPhoto] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");
  const [homeRedirect, setHomeRedirect] = useState(false);

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

  const deleteHandleChange = (e) => {
    setConfirmDeleteText(e.target.value);
  };

  const handleDelete = async () => {
    if (confirmDeleteText.toLowerCase() === "yes") {
      setLoading(true);
      deleteBiz(bizId, authUserId, token).then((res) => setHomeRedirect(true));
    } else {
      setError("Please Type 'Yes' to confirm delete");
    }
  };

  const redirectUser = () => {
    if (homeRedirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        setLoading(true);
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("bizEmail", values.bizEmail);
        formData.append("bizPhone", values.bizPhone);
        formData.append("bizAddress", values.bizAddress);

        if (values.photo) {
          formData.append("photo", values.photo);
        }
        const response = await updateBiz(formData, bizId, authUserId, token);
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
        bizAddress: biz.bizAddress,
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
                "Please Enter a Name (Max. 20 characters)"
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Second Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
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
          {/* Fifth Row */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik03">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address..."
                name="bizAddress"
                value={values.bizAddress}
                onChange={handleChange}
                isValid={touched.bizAddress && !errors.bizAddress}
                isInvalid={!!errors.bizAddress && touched.bizAddress}
              />
              <Form.Control.Feedback />
              <Form.Control.Feedback type="invalid">
                Please Enter your Business Street Address
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          {/* Sixth Row  - File Upload */}
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationFormik01">
              <Form.Label>Profile Photo</Form.Label>
              <br />
              {!newPhoto && (
                <Image
                  style={{ maxWidth: "325px" }}
                  src={biz.photo}
                  thumbnail
                  fluid
                  className="my-2"
                />
              )}

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

          <Form.Row className="my-3 d-flex justify-content-between">
            <Button type="submit">Save Changes</Button>
            <DropdownButton
              variant="info"
              id="dropdown-basic-button"
              title="Show More"
            >
              <Dropdown.Item
                className="text-danger"
                onClick={() => setConfirmDelete(true)}
              >
                Delete this Biz
              </Dropdown.Item>
            </DropdownButton>
          </Form.Row>
          {redirectUser()}
          {showError()}
          {confirmDelete && (
            <Container>
              <Form.Group>
                <Form.Label className="mt-2">
                  Are you sure you want to delete this Biz and its' items? This
                  action can't be undone.
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type 'YES' to confirm"
                  onChange={deleteHandleChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  className="my-2"
                  variant="danger"
                  onClick={handleDelete}
                >
                  {" "}
                  OK
                </Button>
                <Button
                  className="my-2"
                  variant="secondary"
                  onClick={() => {
                    setConfirmDelete(false);
                    setError("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Container>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EditSettingsForm;
