import React from "react";
import AddBizForm from "./AddBizForm";
import { Modal, Button } from "react-bootstrap";

const AddBizModal = ({ showAddModal, setShowAddModal, authUser }) => {
  const handleClose = () => {
    setShowAddModal(false);
  };
  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Business</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddBizForm authUser={authUser} />
        <Button variant="secondary" onClick={handleClose} className="my-2">
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddBizModal;
