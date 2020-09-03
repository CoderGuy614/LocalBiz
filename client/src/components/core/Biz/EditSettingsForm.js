import React, { useState, useEffect } from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";
import EditableField from "./EditableField";
import DisplayField from "./DisplayField";
import ReactTooltip from "react-tooltip";
import { getBusiness, getCategories } from "../apiCore";

const EditSettingsForm = ({ bizId, settingsUpdated, setSettingsUpdated }) => {
  const [business, setBusiness] = useState({});
  const [categories, setCategories] = useState([]);
  const [isEditable, setIsEditable] = useState({
    name: false,
    description: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    getBusiness(bizId)
      .then((biz) => setBusiness(biz))
      .catch((err) => console.log(err));
  }, []);

  const { name, description, bizEmail, bizPhone } = business;

  return (
    <Container>
      <Form>
        <ListGroup>
          {isEditable.name && (
            <EditableField
              field="name"
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter Name"
              buttonVariant="success"
            />
          )}
          {!isEditable.name && (
            <DisplayField
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              field="name"
              displayValue={name}
            />
          )}

          {isEditable.description && (
            <EditableField
              field="description"
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter description"
              buttonVariant="success"
            />
          )}
          {!isEditable.description && (
            <DisplayField
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              field="description"
              displayValue={description}
            />
          )}

          {isEditable.email && (
            <EditableField
              field="email"
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter email"
              buttonVariant="success"
            />
          )}
          {!isEditable.email && (
            <DisplayField
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              field="email"
              displayValue={bizEmail}
            />
          )}
          {isEditable.phone && (
            <EditableField
              field="phone"
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter phone"
              buttonVariant="success"
            />
          )}
          {!isEditable.phone && (
            <DisplayField
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              field="phone"
              displayValue={bizPhone}
            />
          )}
        </ListGroup>
        <div className="d-flex">
          <Button variant="success" className="my-2">
            Save Changes
          </Button>
          <Button variant="danger" className="my-2 ml-auto">
            Delete Business
          </Button>
        </div>
      </Form>
      <ReactTooltip id="edit-tooltip" place="right" effect="solid">
        Click To Edit
      </ReactTooltip>
    </Container>
  );
};

export default EditSettingsForm;
