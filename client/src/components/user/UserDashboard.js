import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import { getMessagesByUser } from "../core/apiCore";

const UserDashboard = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMessagesByUser(userId, token)
      .then((msgs) => setMessages(msgs))
      .catch((err) => setError(err));
  }, []);

  return (
    <Layout title="Dashboard" description="Manage your customer requests.">
      <Container>
        <Row>
          <h4>Messages</h4>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
