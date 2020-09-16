import React from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";

const UserChatTile = ({ selected, setSelected, msgUser }) => {
  return (
    <Container
      onClick={() => setSelected(msgUser._id)}
      className={
        "border border-rounded p-1 " +
        (selected === msgUser._id ? "bg-secondary" : "bg-primary")
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
        <h6
          className={
            (selected === msgUser._id ? "text-white " : "text-muted ") + "mt-2"
          }
        >
          {msgUser.name}
        </h6>
      </Row>
    </Container>
  );
};

export default UserChatTile;
