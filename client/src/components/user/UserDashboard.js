import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import UserChat from "./UserChat";
import { getMessagesByToUser } from "../core/apiCore";

const UserDashboard = ({ authUserId, token, isAuthenticated }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getMessagesByToUser(authUserId, token)
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
        {users.map((usr) => (
          <UserChat
            fromUser={usr}
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
