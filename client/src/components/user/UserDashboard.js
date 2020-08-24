import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

import { isAuthenticated, signout } from "../../auth/Index";

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  return (
    <Container>
      <Row>{`Welcome to the User Dashboard ${name}`}</Row>
      <Row>
        <Button onClick={signout}>Logout</Button>
      </Row>
    </Container>
  );
};

export default UserDashboard;
