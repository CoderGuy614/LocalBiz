import React from "react";
import { Container, Form, Button } from "react-bootstrap";

const EditableField = ({
  field,
  isEditable,
  setIsEditable,
  values,
  setValues,
  inputType,
  placeholder,
}) => {
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <Container className="mt-2">
      <Form.Control
        name={field}
        value={values[field]}
        type={inputType}
        placeholder={placeholder}
        onChange={handleChange(field)}
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
