import React from "react";
import { Container, Col, Button } from "react-bootstrap";

const FormFooter = () => {
  return (
    <Container className="d-flex justify-content-center">
      <Col md={6} className="d-flex justify-content-center align-items-center">
        <p className="text-muted">Form by Jonathan Lutz</p>
        <Button
          href="https://github.com/CoderGuy614/raiselyForm"
          className="btn-info ml-2 p-2 mb-4"
        >
          <i className="fab fa-github mr-2"></i>Github Repo
        </Button>
      </Col>
    </Container>
  );
};

export default FormFooter;
