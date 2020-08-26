import React, { useState } from "react";
import { Form, Alert, Button, Row, Col, Container } from "react-bootstrap";
import Layout from "../core/Layout";
import { Redirect } from "react-router-dom";
import FBLogin from "./FBLogin";

import { signin, authenticate, isAuthenticated } from "../../auth/Index";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showLoading = () => loading && <Alert variant="info">Loading...</Alert>;

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout title="Login" description="Sign In with email or Facebook">
      <Container>
        {showLoading()}
        {showError()}
        {redirectUser()}
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password")}
                  value={password}
                />
              </Form.Group>

              <Button
                variant="primary"
                block
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
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
