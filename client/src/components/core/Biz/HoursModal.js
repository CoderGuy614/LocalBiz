import React from "react";
import HoursForm from "./HoursForm";
import { Modal, Button, Container } from "react-bootstrap";

const HoursModal = ({
  showHoursModal,
  setShowHoursModal,
  bizId,
  token,
  authUserId,
  hoursUpdated,
  setHoursUpdated,
}) => {
  return (
    <>
      <Modal
        show={showHoursModal}
        onHide={() => setShowHoursModal(false)}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Business Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HoursForm
            bizId={bizId}
            authUserId={authUserId}
            token={token}
            hoursUpdated={hoursUpdated}
            setShowModal={setShowHoursModal}
            setHoursUpdated={setHoursUpdated}
          />
          <Container>
            <Button
              variant="secondary"
              onClick={() => setShowHoursModal(false)}
            >
              Close
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HoursModal;
