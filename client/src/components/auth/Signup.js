import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Container, Col, Row, Button, Alert } from "react-bootstrap";
import Loading from "../core/Layout/Loading";
import Layout from "../core/Layout/Layout";
import AuthContext from "../../context/auth/authContext";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const authContext = useContext(AuthContext);
  const { register, error, isAuthenticated } = authContext;

  // const [success, setSuccess] = useState("");

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
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
  };

  // const showSuccess = () => (
  //   <Alert
  //     variant="success"
  //     className="mt-3"
  //     style={{ display: isAuthenticated ? "" : "none" }}
  //   >
  //     {success} Please <a href="#">Click Here</a> to Login
  //   </Alert>
  // );

  return (
    <Layout
      title="Sign Up with Email or Facebook"
      description="Registered users can post a store and items to sell, leave ratings and comments, and more."
    >
      <Container className="d-flex justify-content-center my-4">
        <Row className="border border-primary rounded my-auto px-4 pb-4 m-2">
          <Formik
            validationSchema={schema}
            onSubmit={(values) => register(values)}
            initialValues={{
              name: "",
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
                {/* <Loading loading={loading} /> */}
                {showError()}
                {redirectUser()}
                {/* {showSuccess()} */}
                <Form.Row>
                  <Button
                    className="my-3"
                    block
                    type="submit"
                    disabled={isAuthenticated}
                  >
                    Continue
                  </Button>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
