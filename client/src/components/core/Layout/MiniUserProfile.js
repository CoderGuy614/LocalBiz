import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import Moment from "react-moment";

const MiniUserProfile = ({ user }) => (
  <Row>
    <Col xs="auto" style={{ paddingRight: "5px" }}>
      <Image style={{ height: "70px" }} roundedCircle src={user.avatar} />
    </Col>
    <Col style={{ paddingLeft: "5px" }}>
      <p className="ml-3">Business Owner: {user.name}</p>
      <p className="ml-3">
        Member Since:{" "}
        <Moment fromNow ago>
          {user.date}
        </Moment>{" "}
        ago{" "}
      </p>
    </Col>
  </Row>
);

export default MiniUserProfile;
