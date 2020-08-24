import React from "react";
import { Container, Button } from "react-bootstrap";
import { signout } from "../../auth/Index";

const UserDashboard = () => {
  return (
    <Container>
      Welcome to the User Dashboard
      <Button onClick={signout}>Logout</Button>
    </Container>
  );
};

export default UserDashboard;
