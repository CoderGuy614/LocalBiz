import React, { useState } from "react";
import { deleteItem } from "../apiCore";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({
  showDelete,
  setShowDelete,
  itemsUpdated,
  setItemsUpdated,
  id,
}) => {
  const handleClose = () => {
    setShowDelete(false);
  };

  const handleDelete = () => {
    deleteItem(id).then((response) => setItemsUpdated(!itemsUpdated));

    setShowDelete(false);
  };

  return (
    <Modal show={showDelete} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
