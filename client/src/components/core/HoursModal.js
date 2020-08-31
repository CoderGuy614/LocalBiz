import React, { useState } from "react";
import HoursForm from "./HoursForm";
import { Modal, Button } from "react-bootstrap";

const HoursModal = ({ show, handleClose, id }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Business Hours</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HoursForm id={id} />
        </Modal.Body>
        <Modal.Footer>
          <Button block variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HoursModal;
