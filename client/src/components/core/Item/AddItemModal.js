import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import AddItemForm from "./AddItemForm";

const AddItemModal = ({
  showAddModal,
  setShowAddModal,
  itemsUpdated,
  setItemsUpdated,
  bizId,
  userId,
}) => {
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setShowAddModal(false);
  };

  useEffect(() => {
    if (success) {
      setShowAddModal(false);
      setItemsUpdated(!itemsUpdated);
    }
    //eslint-disable-next-line
  }, [success]);

  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddItemForm bizId={bizId} setSuccess={setSuccess} userId={userId} />

        <Button variant="secondary" onClick={handleClose} className="my-2">
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
