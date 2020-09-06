import React, { useState, useContext } from "react";
import {
  Form,
  Alert,
  Button,
  Row,
  Col,
  Container,
  Spinner,
} from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import { Redirect } from "react-router-dom";
import FBLogin from "./FBLogin";
import AuthContext from "../../context/auth/authContext";

const Login = () => {
  const authContext = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const [validated, setValidated] = useState(false);
  const { login, clearErrors, error, isAuthenticated } = authContext;
  const { email, password, loading } = values;

  const handleChange = (name) => (event) => {
    clearErrors();
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      login({ email, password });
    }
  };

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showLoading = () => (
    <div className="d-flex justify-content-center my-4">
      <Spinner
        style={{ display: loading ? "" : "none" }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  const redirectUser = () => {
    if (isAuthenticated && !error) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout title="Login" description="Sign In with Email or Facebook">
      <Container>
        {showLoading()}
        {showError()}
        {redirectUser()}
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={handleChange("email")}
                  value={email}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter a Valid Email Address
                </Form.Control.Feedback>
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={handleChange("password")}
                  value={password}
                />
                <Form.Control.Feedback type="invalid">
                  Please Enter your Password
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" block type="submit">
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
