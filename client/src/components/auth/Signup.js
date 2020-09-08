import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Loading from "../core/Layout/Loading";
import Layout from "../core/Layout/Layout";
import FBLogin from "./FBLogin";
import AuthContext from "../../context/auth/authContext";
const Signup = () => {
  const authContext = useContext(AuthContext);
  const { register } = authContext;
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    error: "",
    loading: false,
    success: false,
  });

  const { name, email, password, password2, success, loading, error } = values;
  // Add Formik Form and Error handling fUnctions
  // Add loading status

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
    });
  };

  const redirectUser = () => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register({ name, email, password }).then((data) => {
        console.log(data);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          password2: "",
          error: "",
          success: true,
        });
      });
    } catch (err) {
      setValues({ ...values, error: err, success: false });
    }
  };

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  return (
    <Layout
      title="Sign Up with Email or Facebook"
      description="Registered users can post a store and items to sell, leave ratings and comments, and more."
    >
      <Container>
        <Loading loading={loading} />
        {showError()}
        {redirectUser()}
        <Row className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={handleChange("name")}
                  value={name}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
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
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange("password2")}
                  value={password2}
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

export default Signup;
