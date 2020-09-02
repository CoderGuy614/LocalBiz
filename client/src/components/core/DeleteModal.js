import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ showDelete, setShowDelete, id }) => {
  const handleClose = () => {
    setShowDelete(false);
  };

  return (
    <Modal show={showDelete} onHide={handleClose}>
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

export default DeleteModal;
