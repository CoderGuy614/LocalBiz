import React from "react";
import { Container, Button } from "react-bootstrap";
import { signout } from "../../auth/Index";
import { isAuthenticated } from "../../auth/Index";

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();
  return (
    <Container>
      {`Welcome to the Admin Dashboard ${name}`}
      <Button onClick={signout}>Logout</Button>
    </Container>
  );
};

export default AdminDashboard;
