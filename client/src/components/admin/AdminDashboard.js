import React from "react";
import { Container, Row } from "react-bootstrap";
import Layout from "../core/Layout/Layout";

const AdminDashboard = () => {
  return (
    <Layout
      title="Admin Dashboard"
      description="Manage your business and account info"
    >
      <Container>
        <Row>{`Welcome to the Admin Dashboard`}</Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
