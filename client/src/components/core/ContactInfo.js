import React from "react";
import { ListGroup } from "react-bootstrap";

const ContactInfo = ({ email, phone }) => {
  return (
    <div className="my-3">
      <ListGroup>
        <ListGroup.Item>
          <span>
            <i className="fas fa-envelope-square mr-2"></i>
          </span>{" "}
          {email}
        </ListGroup.Item>
        <ListGroup.Item>
          <span>
            <i className="fas fa-phone mr-2"></i>
          </span>{" "}
          {phone}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ContactInfo;
