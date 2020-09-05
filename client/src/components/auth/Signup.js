import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import FBLogin from "./FBLogin";
import { signup, authenticate } from "../../auth/apiAuth";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    error: "",
    success: false,
  });

  const { name, email, password, password2, success, error } = values;

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
    // setValues({ ...values, error: false });
    try {
      signup({ name, email, password }).then((data) => {
        //The New User is Created and Token is Sent Back to Client
        //Set this into Local Storage and then Redirect the User to the Shop Page
        console.log(data);
        authenticate(data, () =>
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            password2: "",
            error: "",
            success: true,
          })
        );
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

  // const showSuccess = () => (
  //   <Alert variant="success" style={{ display: success ? "" : "none" }}>
  //     {" "}
  //     You Have Succesfully Signed Up! Please <Link to="/login">Sign in</Link>
  //   </Alert>
  // );

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
