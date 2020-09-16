import React, { useState, useEffect } from "react";
import { Container, Alert, Col } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import UserChat from "./UserChat";
import UserChatTile from "./UserChatTile";
import { getMessagesByUser } from "../core/apiCore";

const UserDashboard = ({ authUserId, token, isAuthenticated }) => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessage] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [msgUpdated, setMsgUpdated] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    let rememberSelected;
    if (selected) {
      rememberSelected = selected;
    }
    getMessagesByUser(authUserId, token)
      .then((msgs) => {
        if (msgs.length === 0) {
          return setError("No Messages to Show");
        }
        setMessages(msgs);
        setSelected(rememberSelected);
        setUsers(getUniqueUsers(msgs, authUserId, selected._id));
        setFilteredMessage(filterMessages(msgs));
      })
      .catch((err) => {
        console.log("CATCH ERROR", err);
      });
  }, [msgUpdated]);

  const filterMessages = (msgs, user1, user2) => {
    if (!msgs || msgs.length === 0) {
      return [];
    } else {
      return msgs.filter(
        (m) =>
          (m.to._id === user1 && m.from._id === user2) ||
          (m.from._id === user1 && m.to._id === user2) ||
          user1 === user2
      );
    }
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
    const result = uniqueUsers.filter((usr) => usr._id !== authUserId);
    setSelected(result[0]);
    return result;
  };

  const showError = () => (
    <Alert variant="warning" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  return (
    <Layout title="Message Center" description="View and respond to messages.">
      <Container className="d-flex">
        {showError()}
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
          <UserChat
            msgUser={selected}
            authUserId={authUserId}
            token={token}
            isAuthenticated={isAuthenticated}
            messages={filteredMessages}
            msgUpdated={msgUpdated}
            setMsgUpdated={setMsgUpdated}
          />
        </Col>
      </Container>
    </Layout>
  );
};

export default UserDashboard;
