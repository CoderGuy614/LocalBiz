import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";

const MessageDisplay = ({ item, messages, msgUser, authUserId }) => {
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

  const setJustify = (msg) => {
    if (msg.from._id === msgUser._id) {
      return "text-right";
    } else {
      return "text-left";
    }
  };

  const setContent = (msg) => {
    if (msg.from._id === msgUser._id) {
      return (
        <ListGroup.Item key={msg._id} className="text-right">
          {msg.text}
          <Image
            src={msg.from.avatar}
            roundedCircle
            style={{ height: "20px" }}
            className="ml-2"
          />
        </ListGroup.Item>
      );
    } else {
      return (
        <ListGroup.Item key={msg._id} className="text-left">
          <Image
            src={msg.from.avatar}
            roundedCircle
            style={{ height: "15px" }}
            className="mr-2"
          />
          {msg.text}
        </ListGroup.Item>
      );
    }
  };

  return (
    <Container>
      <ListGroup variant="flush">
        {filteredMessages.map((msg) => setContent(msg))}
      </ListGroup>
    </Container>
  );
};

export default MessageDisplay;
