import React, { useState, useEffect } from "react";
import { Container, Alert, Col } from "react-bootstrap";
import Layout from "../core/Layout/Layout";
import UserChat from "./UserChat";
import UserChatTile from "./UserChatTile";
import { getMessagesByUser } from "../core/apiCore";

const UserDashboard = ({ authUserId, token, isAuthenticated }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [msgUpdated, setMsgUpdated] = useState(false);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    getMessagesByUser(authUserId, token)
      .then((msgs) => {
        setMessages(msgs);
        setUsers(getUniqueUsers(msgs));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [msgUpdated]);

  const filterMessages = (msgs, user1, user2) => {
    return msgs.filter(
      (m) =>
        (m.to._id === user1 && m.from._id === user2) ||
        (m.from._id === user1 && m.to._id === user2) ||
        user1 === user2
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
    //Checking for unique users that are not the authUser
    messages.forEach((msg) => {
      if (
        !uniqueUserIds.includes(msg.from._id) &&
        msg.from._id !== authUserId
      ) {
        uniqueUsers.push(msg.from);
        uniqueUserIds.push(msg.from._id);
      } else if (
        !uniqueUserIds.includes(msg.to._id) &&
        msg.to._id !== authUserId
      ) {
        uniqueUsers.push(msg.to);
        uniqueUserIds.push(msg.to._id);
      }
    });
    //Checking for condition of a 1st sent message by auth user
    messages.forEach((msg) => {
      if (msg.from._id === authUserId && !uniqueUserIds.includes(msg.to._id)) {
        uniqueUsers.push(msg.to);
        uniqueUserIds.push(msg.to._id);
      }
    });

    return uniqueUsers;
    // return uniqueUsers.filter((usr) => usr._id !== authUserId);
  };

  const showError = () => (
    <Alert variant="warning" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const filteredMessages = filterMessages(messages, authUserId, selected._id);
  // const filteredUsers = checkIfMe(authUserId);

  return (
    <Layout title="Message Center" description="View and respond to messages.">
      <Container fluid className="d-sm-flex mt-2">
        {showError()}
        <Col xs={12} sm={3} med={2}>
          {users.map((usr, index) => (
            <UserChatTile
              key={usr._id}
              index={index}
              selected={selected}
              setSelected={setSelected}
              msgUser={checkIfMe(authUserId, usr)}
            />
          ))}
        </Col>
        <Col xs={12} sm={9} med={10}>
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
