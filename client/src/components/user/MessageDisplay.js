import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const MessageDisplay = ({ item, messages, fromUser, authUserId }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (messages) {
      setFilteredMessages(filterMessages(messages));
    }
  }, [messages]);

  const filterMessages = (messages) => {
    const filteredByUser = messages.filter(
      (msg) => msg.from._id === authUserId || msg.to._id === authUserId
    );
    const filteredByItem = filteredByUser.filter(
      (msg) => msg.item._id === item._id
    );
    return filteredByItem;
  };

  return (
    <Container>
      <ListGroup>
        {filteredMessages.map((msg) => (
          <ListGroup.Item key={msg._id}>{msg.text}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default MessageDisplay;
