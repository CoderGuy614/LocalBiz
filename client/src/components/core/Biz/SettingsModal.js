import React from "react";
import { Modal, Button } from "react-bootstrap";
import EditSettingsForm from "./EditSettingsForm";
import EditSettingsForm2 from "./EditSettingsForm2";

const SettingsModal = ({
  bizId,
  authUserId,
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
        <EditSettingsForm2
          bizId={bizId}
          authUserId={authUserId}
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
