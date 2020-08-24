import React from "react";
import { Container, Button } from "react-bootstrap";
import { signout } from "../../auth/Index";

const AdminDashboard = () => {
  return (
    <Container>
      Welcome to the Admin Dashboard
      <Button onClick={signout}>Logout</Button>
    </Container>
  );
};

export default AdminDashboard;
