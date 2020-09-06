import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  ListGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import EditableField from "./EditableField";
import DisplayField from "./DisplayField";
import ReactTooltip from "react-tooltip";
import { getBusiness, updateBiz, deleteBiz } from "../apiCore";

const EditSettingsForm = ({
  bizId,
  authUserId,
  settingsUpdated,
  setSettingsUpdated,
  setShowSettingsModal,
}) => {
  const [isEditable, setIsEditable] = useState({
    name: false,
    description: false,
    email: false,
    phone: false,
  });

  const [values, setValues] = useState({
    name: "",
    description: "",
    bizEmail: "",
    bizPhone: "",
  });

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteText, setConfirmDeleteText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [homeRedirect, setHomeRedirect] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBusiness(bizId)
      .then((biz) => {
        setLoading(false);
        setValues(biz);
      })
      .catch((err) => setError(err));
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    updateBiz(values, bizId, authUserId).then((data) => {
      console.log(data);
      setLoading(false);
      setShowSettingsModal(false);
      setSettingsUpdated(!settingsUpdated);
    });
  };

  const deleteHandleChange = (e) => {
    setConfirmDeleteText(e.target.value);
  };

  const handleDelete = () => {
    if (confirmDeleteText.toLowerCase() === "yes") {
      setLoading(true);
      deleteBiz(bizId, authUserId).then((data) => setHomeRedirect(true));
    } else {
      setError("Please Type 'Yes' to confirm delete");
    }
  };

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const redirectUser = () => {
    if (homeRedirect) {
      return <Redirect to="/" />;
    }
  };

  const showLoading = () => (
    <div className="d-flex justify-content-center my-4">
      <Spinner
        style={{ display: loading ? "" : "none" }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  const { name, description, bizEmail, bizPhone } = values;

  return (
    <Container>
      <Form data-tip data-for="edit-tooltip">
        <ListGroup>
          {isEditable.name && (
            <EditableField
              field="name"
              stateField="name"
              values={values}
              setValues={setValues}
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter Name"
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
              stateField="description"
              values={values}
              setValues={setValues}
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter description"
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
              stateField="bizEmail"
              values={values}
              setValues={setValues}
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="email"
              placeholder="Enter email"
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
              stateField="bizPhone"
              values={values}
              setValues={setValues}
              setIsEditable={setIsEditable}
              isEditable={isEditable}
              inputType="text"
              placeholder="Enter phone"
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
        {!isEditable.name &&
          !isEditable.description &&
          !isEditable.email &&
          !isEditable.phone &&
          !confirmDelete && (
            <div className="d-flex">
              <Button variant="success" className="my-2" onClick={handleSubmit}>
                Save Changes
              </Button>
              <Button
                variant="danger"
                className="my-2 ml-auto"
                onClick={() => setConfirmDelete(true)}
              >
                Delete Business
              </Button>
            </div>
          )}

        {confirmDelete && (
          <Container>
            <Form.Group>
              <Form.Label className="mt-2">
                Are you sure you want to delete this Biz and its' items This
                action can't be undone?
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Type 'YES' to confirm"
                onChange={deleteHandleChange}
              />
            </Form.Group>
            {showError()}
            <div className="d-flex justify-content-between">
              <Button className="my-2" variant="danger" onClick={handleDelete}>
                {" "}
                OK
              </Button>
              <Button
                className="my-2"
                variant="secondary"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </div>
          </Container>
        )}
      </Form>
      {showLoading()}
      <ReactTooltip id="edit-tooltip" place="right" effect="solid">
        Click A Field To Edit It
      </ReactTooltip>
      {redirectUser()}
    </Container>
  );
};

export default EditSettingsForm;
