import React, { useState } from "react";
import { deleteItem } from "../apiCore";
import { Modal, Button, Spinner } from "react-bootstrap";

const DeleteModal = ({
  showDelete,
  setShowDelete,
  itemsUpdated,
  setItemsUpdated,
  token,
  itemId,
  authUserId,
}) => {
  const handleClose = () => {
    setShowDelete(false);
  };

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    deleteItem(itemId, authUserId, token).then((response) => {
      setLoading(false);
      setItemsUpdated(!itemsUpdated);
    });
    setShowDelete(false);
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

  return (
    <Modal show={showDelete} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this item?
        {showLoading()}
      </Modal.Body>
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
