import React from "react";
import HoursForm from "./HoursForm";
import { Modal, Button, Container } from "react-bootstrap";

const HoursModal = ({
  showModal,
  setShowModal,
  bizId,
  authUserId,
  hoursUpdated,
  setHoursUpdated,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Business Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HoursForm
            bizId={bizId}
            authUserId={authUserId}
            hoursUpdated={hoursUpdated}
            setShowModal={setShowModal}
            setHoursUpdated={setHoursUpdated}
          />
          <Container>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HoursModal;
