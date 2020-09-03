import React from "react";
import HoursForm from "./HoursForm";
import { Modal, Button, Container } from "react-bootstrap";

const HoursModal = ({
  showModal,
  setShowModal,
  id,
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
            id={id}
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
