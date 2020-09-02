import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({ showEdit, setShowEdit, id }) => {
  const handleClose = () => {
    setShowEdit(false);
  };

  return (
    <Modal show={showEdit} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Yes
        </Button>
        <Button variant="danger" onClick={handleClose}>
          No
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
