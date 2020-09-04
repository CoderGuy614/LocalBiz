import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

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
  const [error, setError] = useState("");

  const handleChange = (stateField) => (e) => {
    setError("");
    setValues({ ...values, [stateField]: e.target.value });
  };

  const showError = () => (
    <Alert
      variant="danger"
      className="mt-2"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const handleToggle = (field) => {
    if (!values[stateField]) {
      setError(`${field} is Required`);
    } else {
      setIsEditable({ ...isEditable, [field]: false });
    }
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
      {showError()}
      <div className="d-flex justify-content-between">
        <Button
          className="my-2"
          variant="success"
          onClick={() => handleToggle(field)}
        >
          Ok
        </Button>
        <Button
          className="my-2"
          variant="secondary"
          onClick={() => handleToggle(field)}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
};

export default EditableField;
