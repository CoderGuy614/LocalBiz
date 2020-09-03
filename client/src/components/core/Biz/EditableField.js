import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const EditableField = ({
  field,
  isEditable,
  setIsEditable,
  inputType,
  placeholder,
  buttonVariant,
}) => {
  return (
    <Container className="mt-2">
      <Form.Control type={inputType} placeholder={placeholder} />
      <Button
        className="my-2"
        variant={buttonVariant}
        onClick={() => setIsEditable({ ...isEditable, [field]: false })}
      >
        Ok
      </Button>
    </Container>
  );
};

export default EditableField;
