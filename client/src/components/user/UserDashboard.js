import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import UserChat from "./UserChat";
import { getMessagesByUser } from "../core/apiCore";

const UserDashboard = ({ authUserId, token, isAuthenticated }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getMessagesByUser(authUserId, token)
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
      if (!uniqueUserIds.includes(msg.from._id || msg.to._id)) {
        uniqueUsers.push(msg.from);
        uniqueUserIds.push(msg.from._id);
      }
    });
    return uniqueUsers.filter((usr) => usr._id !== authUserId);
  };

  return (
    <Layout title="Dashboard" description="Manage your customer requests.">
      <Container>
        {users.map((usr) => (
          <UserChat
            msgUser={usr}
            authUserId={authUserId}
            token={token}
            isAuthenticated={isAuthenticated}
            key={usr._id}
            messages={messages}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default UserDashboard;
