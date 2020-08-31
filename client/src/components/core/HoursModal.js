import React, { useState } from "react";
import HoursForm from "./HoursForm";
import { Modal, Button, Container } from "react-bootstrap";

const HoursModal = ({ show, handleClose, id }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Business Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HoursForm id={id} />
          <Container>
            <Button block variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HoursModal;
