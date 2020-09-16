import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import UserChat2 from "./UserChat2";
import UserChatTile from "./UserChatTile";
import { getMessagesByUser } from "../core/apiCore";

const UserDashboard = ({ authUserId, token, isAuthenticated }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [msgUpdated, setMsgUpdated] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getMessagesByUser(authUserId, token)
      .then((msgs) => {
        setMessages(msgs);
        setUsers(getUniqueUsers(msgs));
      })
      .catch((err) => setError(err));
  }, [msgUpdated]);

  // useEffect(() => {
  //   if (users && users.length > 0) {
  //     setSelected(users[0]._id);
  //   }
  // }, []);

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
      <Container className="d-flex">
        <Col xs={4}>
          {users.map((usr) => (
            <UserChatTile
              key={usr._id}
              selected={selected}
              setSelected={setSelected}
              msgUser={checkIfMe(authUserId, usr)}
            />
          ))}
        </Col>
        <Col xs={8}>
          {users.map((usr) => (
            <UserChat2
              msgUser={checkIfMe(authUserId, usr)}
              authUserId={authUserId}
              token={token}
              isAuthenticated={isAuthenticated}
              key={usr._id}
              messages={filterMessages(messages, authUserId, usr._id)}
              msgUpdated={msgUpdated}
              setMsgUpdated={setMsgUpdated}
            />
          ))}
        </Col>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
