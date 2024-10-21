import React, { useState, useEffect } from "react";
import { ListGroup, Alert, Container } from "react-bootstrap";
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

  useEffect(() => {
    if (messages) {
      setItems(getUniqueItems(messages));
    }
    //eslint-disable-next-line
  }, [messages]);

  const getUniqueItems = (messages) => {
    let uniqueItems = [];
    let uniqueItemIds = [];
    messages.forEach((msg) => {
      if(!msg.item) return [];
      if (
        !uniqueItemIds.includes(msg.item._id) &&
        (msg.from._id === msgUser._id || msg.to._id === msgUser._id)
      ) {
        uniqueItems.push(msg.item);
        uniqueItemIds.push(msg.item._id);
      }
    });
    return uniqueItems;
  };

  return (
    <Container className="mt-2">
      {messages.length === 0 && (
        <Alert className="w-100 text-center" variant="secondary">
          <i className="fas fa-hand-point-left fa-2x mr-4"></i> Select a User
          Chat
        </Alert>
      )}
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
    </Container>
  );
};

export default UserChat;
