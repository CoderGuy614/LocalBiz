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

  const filterMessages = (msgs, user1, user2) => {
    return msgs.filter(
      (m) =>
        (m.to._id == user1 && m.from._id == user2) ||
        (m.from._id == user1 && m.to._id == user2) ||
        user1 == user2
    );
  };

  const checkIfMe = (authId, usr) => {
    if (!messages || authId !== usr._id) {
      return usr;
    } else {
      return messages[0].to;
    }
  };

  const getUniqueUsers = (messages) => {
    let uniqueUsers = [];
    let uniqueUserIds = [];
    messages.forEach((msg) => {
      if (!uniqueUserIds.includes(msg.from._id)) {
        uniqueUsers.push(msg.from);
        uniqueUserIds.push(msg.from._id);
      } else if (!uniqueUserIds.includes(msg.to._id)) {
        uniqueUsers.push(msg.to);
        uniqueUserIds.push(msg.to._id);
      }
    });
    // return uniqueUsers;
    return uniqueUsers.filter((usr) => usr._id !== authUserId);
  };

  return (
    <Layout title="Dashboard" description="Manage your customer requests.">
      <Container>
        {users.map((usr) => (
          <UserChat
            msgUser={checkIfMe(authUserId, usr)}
            authUserId={authUserId}
            token={token}
            isAuthenticated={isAuthenticated}
            key={usr._id}
            messages={filterMessages(messages, authUserId, usr._id)}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default UserDashboard;
