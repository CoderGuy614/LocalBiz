import React, { useState, useEffect } from "react";
import AddBizForm from "./AddBizForm";
import AddBizForm2 from "./AddBizForm2";
import { Modal, Button } from "react-bootstrap";

const AddBizModal = ({ showAddModal, setShowAddModal, authUser }) => {
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setShowAddModal(false);
  };
  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Business</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddBizForm2 setSuccess={setSuccess} authUser={authUser} />

        <Button variant="secondary" onClick={handleClose} className="my-2">
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddBizModal;
