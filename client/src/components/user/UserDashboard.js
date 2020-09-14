import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import UserChat from "./UserChat";
import { getMessagesByUser } from "../core/apiCore";

const UserDashboard = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getMessagesByUser(userId, token)
      .then((msgs) => {
        setMessages(msgs);
        setUsers(getUniqueUsers(msgs));
      })
      .catch((err) => setError(err));
  }, []);

  const getUniqueUsers = (messages) => {
    let uniqueUsers = [];
    let uniqueUserIds = [];
    messages.forEach((msg) => {
      if (!uniqueUserIds.includes(msg.from._id)) {
        uniqueUsers.push(msg.from);
        uniqueUserIds.push(msg.from._id);
      }
    });
    return uniqueUsers;
  };

  return (
    <Layout title="Dashboard" description="Manage your customer requests.">
      <Container>
        <Row>
          <Col xs={4}>
            {users.map((usr) => (
              <UserChat user={usr} key={usr._id} />
            ))}
          </Col>
          <Col xs={8}>"PUT CHATS HERE"</Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
