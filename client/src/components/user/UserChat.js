import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import MessageListItem from "./MessageListItem";

// Messages All from the same User
const UserChat = ({
  fromUser,
  authUserId,
  token,
  isAuthenticated,
  messages,
}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (messages) {
      setItems(getUniqueItems(messages));
    }
  }, [messages]);

  const getUniqueItems = (messages) => {
    let uniqueItems = [];
    let uniqueItemIds = [];
    messages.forEach((msg) => {
      if (!uniqueItemIds.includes(msg.item._id)) {
        uniqueItems.push(msg.item);
        uniqueItemIds.push(msg.item._id);
      }
    });
    return uniqueItems;
  };

  return (
    <Row>
      <Col xs={4}>
        <Container className="border border-rounded p-1">
          <Row className="justify-content-center">
            <Image
              roundedCircle
              src={fromUser.avatar}
              style={{ height: "75px" }}
            />
          </Row>
          <Row className="justify-content-center">
            <h5 className="text-muted mt-1">{fromUser.name}</h5>
          </Row>
        </Container>
      </Col>
      <Col xs={8}>
        <ListGroup>
          {items.map((itm) => (
            <ListGroup.Item>
              <MessageListItem
                item={itm}
                token={token}
                messages={messages}
                isAuthenticated={isAuthenticated}
                fromUser={fromUser}
                authUserId={authUserId}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default UserChat;
