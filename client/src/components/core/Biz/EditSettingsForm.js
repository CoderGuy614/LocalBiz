import React, { useState, useEffect } from "react";
import { Form, Button, Container, ListGroup } from "react-bootstrap";
import { getBusiness, getCategories } from "../apiCore";

const EditSettingsForm = ({ bizId, settingsUpdated, setSettingsUpdated }) => {
  const [business, setBusiness] = useState({});
  const [categories, setCategories] = useState([]);

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
          <ListGroup.Item className="settings-list-item d-flex justify-content-between">
            <span className="text-primary font-weight-bold">Name: </span>
            {name}
            <span>
              <i className="fas fa-edit text-white"></i>
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="settings-list-item d-flex justify-content-between">
            <span className="text-primary font-weight-bold">Description: </span>
            {description}
            <span>
              <i className="fas fa-edit text-white"></i>
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="settings-list-item d-flex justify-content-between">
            <span className="text-primary font-weight-bold">Email: </span>
            {bizEmail}
            <span>
              <i className="fas fa-edit text-white"></i>
            </span>
          </ListGroup.Item>
          <ListGroup.Item className="settings-list-item d-flex justify-content-between">
            <span className="text-primary font-weight-bold">Phone: </span>
            {bizPhone}
            <span>
              <i className="fas fa-edit text-white"></i>
            </span>
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
    </Container>
  );
};

export default EditSettingsForm;
