import React, { useState, useEffect } from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";
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
            <Container>
              <Form.Control type="text" placeholder="Enter Name" />
              <Button
                className="my-2"
                variant="success"
                onClick={() => setIsEditable({ ...isEditable, name: false })}
              >
                Ok
              </Button>
            </Container>
          )}
          {!isEditable.name && (
            <ListGroup.Item
              className="settings-list-item"
              data-tip
              data-for="edit-tooltip"
              onClick={() => setIsEditable({ ...isEditable, name: true })}
            >
              <span className="text-primary font-weight-bold">Name: </span>
              {name}
              <span></span>
            </ListGroup.Item>
          )}

          <ListGroup.Item
            className="settings-list-item"
            data-tip
            data-for="edit-tooltip"
          >
            <span className="text-primary font-weight-bold">Description: </span>
            {description}
          </ListGroup.Item>
          <ListGroup.Item
            className="settings-list-item"
            data-tip
            data-for="edit-tooltip"
          >
            <span className="text-primary font-weight-bold">Email: </span>
            {bizEmail}
          </ListGroup.Item>
          <ListGroup.Item
            className="settings-list-item"
            data-tip
            data-for="edit-tooltip"
          >
            <span className="text-primary font-weight-bold">Phone: </span>
            {bizPhone}
          </ListGroup.Item>
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
