import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const EditableField = ({
  field,
  stateField,
  isEditable,
  setIsEditable,
  values,
  setValues,
  inputType,
  placeholder,
}) => {
  const handleChange = (stateField) => (e) => {
    setValues({ ...values, [stateField]: e.target.value });
  };

  return (
    <Container className="mt-2">
      <Form.Control
        name={field}
        value={values[stateField]}
        type={inputType}
        placeholder={placeholder}
        onChange={handleChange(stateField)}
      />
      <div className="d-flex justify-content-between">
        <Button
          className="my-2"
          variant="success"
          onClick={() => setIsEditable({ ...isEditable, [field]: false })}
        >
          Ok
        </Button>
        <Button
          className="my-2"
          variant="secondary"
          onClick={() => setIsEditable({ ...isEditable, [field]: false })}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default EditableField;
