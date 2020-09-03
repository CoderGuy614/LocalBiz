import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditSettingsForm from "./EditSettingsForm";

const SettingsModal = ({
  id,
  showSettingsModal,
  setShowSettingsModal,
  settingsUpdated,
  setSettingsUpdated,
}) => {
  return (
    <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Biz Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditSettingsForm
          bizId={id}
          settingsUpdated={settingsUpdated}
          setSettingsUpdated={setSettingsUpdated}
        />
        <Button
          variant="secondary"
          onClick={() => setShowSettingsModal(false)}
          className="mt-2"
        >
          Cancel
        </Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
