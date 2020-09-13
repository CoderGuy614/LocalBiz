import React from "react";
import { Modal, Button } from "react-bootstrap";
import AddItemForm from "./AddItemForm";

const AddItemModal = ({
  showAddModal,
  setShowAddModal,
  token,
  itemsUpdated,
  setItemsUpdated,
  bizId,
  userId,
}) => {
  const handleClose = () => {
    setShowAddModal(false);
  };

  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddItemForm
          bizId={bizId}
          userId={userId}
          token={token}
          itemsUpdated={itemsUpdated}
          setItemsUpdated={setItemsUpdated}
          setShowAddModal={setShowAddModal}
        />
        <Button variant="secondary" onClick={handleClose} className="my-2">
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddItemModal;
