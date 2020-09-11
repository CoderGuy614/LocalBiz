import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditSettingsForm from "./EditSettingsForm";

const SettingsModal = ({
  bizId,
  authUserId,
  token,
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
          bizId={bizId}
          authUserId={authUserId}
          token={token}
          settingsUpdated={settingsUpdated}
          setSettingsUpdated={setSettingsUpdated}
          setShowSettingsModal={setShowSettingsModal}
        />
        <Button
          variant="secondary"
          onClick={() => setShowSettingsModal(false)}
          className="mt-2"
        >
          Close
        </Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
