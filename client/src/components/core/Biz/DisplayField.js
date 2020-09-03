import React from "react";
import { ListGroup } from "react-bootstrap";

const DisplayField = ({ field, isEditable, setIsEditable, displayValue }) => {
  return (
    <ListGroup.Item
      className="settings-list-item"
      data-tip
      data-for="edit-tooltip"
      onClick={() => setIsEditable({ ...isEditable, [field]: true })}
    >
      <span className="text-primary font-weight-bold">{field}: </span>
      {displayValue}
    </ListGroup.Item>
  );
};

export default DisplayField;
