import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { getItem } from "./apiCore";

const EditModal = ({ showEdit, setShowEdit, id }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    inStock: true,
    canDeliver: true,
    photo: "",
  });
  const handleClose = () => {
    setShowEdit(false);
  };

  useEffect(() => {
    getItem(id)
      .then((item) => setValues(item))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Modal show={showEdit} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
