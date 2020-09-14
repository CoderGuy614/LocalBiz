import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

const MessageDisplay = ({ item, messages, fromUser, authUserId }) => {
  const [filteredMessages, setFilteredMessages] = useState([]);

  // useEffect(() => {
  //     if(messages){
  //         setFilteredMessages(filterMessages(messages))
  //     }
  // }, [messages])

  // const filterMessages = (messages) => {
  //     messages.filter(msg => msg.from === fromUser._id || msg.to )
  // }

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item>{"I Am the message Display"}</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default MessageDisplay;
