import React, { useContext } from "react";
import { Form, Alert, Button, Row, Col, Container } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import Loading from "../../components/core/Layout/Loading";
import { Redirect } from "react-router-dom";
import FBLogin from "./FBLogin";
import AuthContext from "../../context/auth/authContext";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, loading, isAuthenticated } = authContext;

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const redirectUser = () => {
    if (isAuthenticated && !error) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout title="Login" description="Sign In with Email or Facebook">
      <Container>
        <Loading loading={loading} />
        {showError()}
        {redirectUser()}
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => login(values)}
              initialValues={{ email: "", password: "" }}
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
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      value={values.email}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email && touched.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter a Valid Email Address
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password && touched.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please Enter your Password
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" block type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <FBLogin />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Login;
