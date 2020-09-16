import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import MessageListItem from "./MessageListItem";

// Messages All from the same 2 user conversation
const UserChat = ({
  msgUser,
  authUserId,
  token,
  isAuthenticated,
  messages,
  msgUpdated,
  setMsgUpdated,
}) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    if (messages) {
      setItems(getUniqueItems(messages));
    }
  }, [messages]);

  const getUniqueItems = (messages) => {
    let uniqueItems = [];
    let uniqueItemIds = [];
    messages.forEach((msg) => {
      if (
        !uniqueItemIds.includes(msg.item._id) &&
        (msg.from._id == msgUser._id || msg.to._id == msgUser._id)
      ) {
        uniqueItems.push(msg.item);
        uniqueItemIds.push(msg.item._id);
      }
    });
    return uniqueItems;
  };

  return (
    <Row>
      <Col xs={4}>
        <Container
          className={
            "border border-rounded p-1 " +
            (selected ? "bg-secondary" : "bg-primary")
          }
        >
          <Row className="justify-content-center">
            <Image
              roundedCircle
              src={msgUser.avatar}
              className="mt-2"
              style={{ height: "50px" }}
            />
          </Row>
          <Row className="justify-content-center">
            <h6 className={(selected ? "text-white " : "text-muted ") + "mt-2"}>
              {msgUser.name}
            </h6>
          </Row>
        </Container>
      </Col>
      <Col xs={8}>
        <ListGroup>
          {items.map((itm) => (
            <ListGroup.Item key={itm._id}>
              <MessageListItem
                item={itm}
                token={token}
                messages={messages}
                isAuthenticated={isAuthenticated}
                msgUser={msgUser}
                authUserId={authUserId}
                msgUpdated={msgUpdated}
                setMsgUpdated={setMsgUpdated}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  );
};

export default UserChat;
