import React, { useState } from "react";
import { createMessage } from "../core/apiCore";
import MessageDisplay from "./MessageDisplay";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Tabs,
  Tab,
  Form,
  Alert,
} from "react-bootstrap";

//Messages all about the Same Item

const MessageListItem = ({
  item,
  token,
  messages,
  isAuthenticated,
  msgUser,
  authUserId,
}) => {
  const [text, setText] = useState("");

  const translateBool = (bool) => {
    return bool ? "Yes" : "No";
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSendMessage = () => {
    if (isAuthenticated && text.length > 0) {
      const payload = { text };
      createMessage(item._id, authUserId, msgUser._id, payload, token)
        .then((msg) => {
          console.log("MESSAGE SENT", msg);
        })
        .catch((err) => console.log(err));
    }
  };

  const { name, description, photo, price, inStock, canDeliver, _id } = item;

  return (
    <Row className="m-2 border rounded w-100">
      <Col xs={4}>
        <Row className="d-flex">
          <Image className="m-2" src={photo} thumbnail fluid />
        </Row>
        <Row className="m-1 d-flex flex-nowrap"></Row>
      </Col>
      <Col xs={8}>
        <Tabs defaultActiveKey="info" id="tab01" className="my-2">
          <Tab eventKey="info" title="Info">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Name:</strong> {name}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {description}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: $</strong> {price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>In Stock:</strong> {translateBool(inStock)}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Delivery Available:</strong> {translateBool(canDeliver)}
              </ListGroup.Item>
            </ListGroup>
          </Tab>
          <Tab eventKey="contact" title="Message History">
            <MessageDisplay
              item={item}
              messages={messages}
              msgUser={msgUser}
              authUserId={authUserId}
            />
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter a message..."
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              disabled={!isAuthenticated || !text}
              className="btn-secondary btn-sm mb-2"
              onClick={handleSendMessage}
            >
              {isAuthenticated
                ? "Send Message"
                : "Please Login To Send Messages"}
            </Button>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default MessageListItem;
