import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { isAuthenticated, signout } from "../auth/Index";

const Homepage = () => {
  //   const {
  //     user: { _id, name, email, role },
  //   } = isAuthenticated();
  return (
    <Container>
      <Row>{`Welcome to the Homepage`}</Row>
      <Row>
        <Button onClick={signout}> Logout</Button>
      </Row>
    </Container>
  );
};

export default Homepage;
