import React, { useEffect } from "react";
import { Container, Row, Image } from "react-bootstrap";

const UserChatTile = ({ selected, setSelected, msgUser, index }) => {
  useEffect(() => {
    if (index === 0) {
      setSelected(msgUser);
    }
  }, []);

  return (
    <Container
      onClick={() => setSelected(msgUser)}
      className={
        "border border-rounded p-1 " +
        (selected._id === msgUser._id ? "bg-secondary" : "bg-primary")
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
            (selected._id === msgUser._id ? "text-white " : "text-muted ") +
            "mt-2"
          }
        >
          {msgUser.name}
        </h6>
      </Row>
    </Container>
  );
};

export default UserChatTile;
