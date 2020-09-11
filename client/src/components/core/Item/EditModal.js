import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditItemForm from "./EditItemForm";

const EditModal = ({
  showEditModal,
  setShowEditModal,
  itemsUpdated,
  setItemsUpdated,
  token,
  authUserId,
  itemId,
}) => {
  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditItemForm
          itemId={itemId}
          authUserId={authUserId}
          token={token}
          setShowEditModal={setShowEditModal}
          itemsUpdated={itemsUpdated}
          setItemsUpdated={setItemsUpdated}
        />
        <Button
          variant="secondary"
          onClick={() => setShowEditModal(false)}
          className="mt-2"
        >
          Cancel
        </Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
