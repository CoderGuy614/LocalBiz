import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const UserChat = ({ user }) => {
  return (
    <Container className="border border-rounded p-1">
      <Row className="justify-content-center">
        <Image roundedCircle src={user.avatar} style={{ height: "75px" }} />
      </Row>
      <Row className="justify-content-center">
        <h5 className="text-muted mt-1">{user.name}</h5>
      </Row>
    </Container>
  );
};

export default UserChat;
