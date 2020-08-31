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
          <Button block variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HoursModal;
