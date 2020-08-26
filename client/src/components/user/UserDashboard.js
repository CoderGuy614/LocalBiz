import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Layout from "../core/Layout";

const UserDashboard = () => {
  return (
    <Layout
      title="User Dashboard"
      description="Manage your business and account info"
    >
      <Container>
        <Row>{`Welcome to the User Dashboard`}</Row>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
