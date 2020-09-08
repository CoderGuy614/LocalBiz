import React, { useState, useEffect } from "react";
import ConfirmModal from "./ConfirmModal";
import { Form, Container, Col, Row, Button, Alert } from "react-bootstrap";
import Loading from "./Loading";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const [fields, setFields] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (response.message) {
      setSuccess(response.message);
    } else if (response.error) {
      setError(response.error);
    }
  }, [response]);

  const showError = () => (
    <Alert
      variant="danger"
      className="mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const showSuccess = () => (
    <Alert
      variant="success"
      className="mt-3"
      style={{ display: success ? "" : "none" }}
    >
      {success} Please <a href="#">Click Here</a> to Login
    </Alert>
  );

  const proceed = (values) => {
    setSuccess("");
    setError("");
    const { firstName, lastName, email, password } = values;
    setFields({ firstName, lastName, email, password });
    setShowModal(true);
  };

  return (
    <>
      <Container className="d-flex justify-content-center my-4">
        <ConfirmModal
          showModal={showModal}
          setShowModal={setShowModal}
          setResponse={setResponse}
          setLoading={setLoading}
          fields={fields}
        />
        <Row className="border border-primary rounded my-auto px-4 pb-4 m-2">
          <Formik
            validationSchema={schema}
            onSubmit={(values) => proceed(values)}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmation: "",
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
              <Form noValidate onSubmit={handleSubmit}>
                <FormHeader />
                {/* First Row */}
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name..."
                      value={values.firstName}
                      onChange={handleChange}
                      isValid={touched.firstName && !errors.firstName}
                      isInvalid={!!errors.firstName && touched.firstName}
                    />
                    <Form.Control.Feedback />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name..."
                      value={values.lastName}
                      onChange={handleChange}
                      isValid={touched.lastName && !errors.lastName}
                      isInvalid={!!errors.lastName && touched.lastName}
                    />

                    <Form.Control.Feedback />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                {/* Second Row */}
                <Form.Row>
                  <Form.Group as={Col} md="12" controlId="validationFormik03">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email Address..."
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email && touched.email}
                    />
                    <Form.Control.Feedback />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6" controlId="validationFormik04">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password..."
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password && touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationFormik05">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password..."
                      name="confirmation"
                      value={values.confirmation}
                      onChange={handleChange}
                      isValid={touched.confirmation && !errors.confirmation}
                      isInvalid={!!errors.confirmation && touched.confirmation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmation}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                {/*  Button Row */}
                <Loading loading={loading} />
                {showError()}
                {showSuccess()}
                <Form.Row>
                  <Button
                    className="my-3"
                    block
                    type="submit"
                    disabled={success}
                  >
                    Continue
                  </Button>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
      <FormFooter />
    </>
  );
};

export default Signup;
