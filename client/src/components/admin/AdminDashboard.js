import React, { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import AuthContext from "../../context/auth/authContext";

const AdminDashboard = () => {
  // const authContext = useContext(AuthContext);
  // const { loadUser } = authContext;

  // useEffect(() => {
  //   loadUser();
  // });

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

export default AdminDashboard;
