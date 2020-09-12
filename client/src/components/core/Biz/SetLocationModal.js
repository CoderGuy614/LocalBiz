import React from "react";
import LocationForm from "./LocationForm";
import { Modal, Button, Container } from "react-bootstrap";

const SetLocationModal = ({
  showSetLocationModal,
  setShowSetLocationModal,
  bizId,
  token,
  authUserId,
  locationUpdated,
  setLocationUpdated,
}) => {
  return (
    <>
      <Modal
        show={showSetLocationModal}
        onHide={() => setShowSetLocationModal(false)}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Set Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocationForm
            bizId={bizId}
            authUserId={authUserId}
            token={token}
            setShowSetLocationModal={setShowSetLocationModal}
            locationUpdated={locationUpdated}
            setLocationUpdated={setLocationUpdated}
          />
          <Container>
            <Button
              variant="secondary"
              onClick={() => setShowSetLocationModal(false)}
            >
              Close
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SetLocationModal;
