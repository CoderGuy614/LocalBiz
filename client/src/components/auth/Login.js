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
    error: "",
    loading: false,
  });
  const { login, isAuthenticated } = authContext;
  const { email, password, loading, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    try {
      login({ email, password });
    } catch (err) {
      console.log(err);
      setValues({ ...values, error: err, loading: false });
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
    if (isAuthenticated) {
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
