import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import EditItemForm from "./EditItemForm";

const EditModal = ({ showEdit, setShowEdit, id }) => {
  const [success, setSuccess] = useState(false);
  const handleClose = () => {
    setShowEdit(false);
  };

  useEffect(() => {
    if (success) {
      setShowEdit(false);
    }
  }, [success]);

  return (
    <Modal show={showEdit} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditItemForm itemId={id} setSuccess={setSuccess} />
        <Button variant="secondary" onClick={handleClose} className="mt-2">
          Cancel
        </Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
