import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { Popup } from "semantic-ui-react";
import Moment from "react-moment";

const MiniUserProfile = ({ user }) => (
  <Row>
    <Col xs="auto" style={{ paddingRight: "5px" }}>
      <Popup
        style={{ background: "white" }}
        content="This is the business owner"
        trigger={
          <Image style={{ height: "70px" }} roundedCircle src={user.avatar} />
        }
      />
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
