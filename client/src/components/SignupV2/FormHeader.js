import React from "react";
import { Image, Container } from "react-bootstrap";

const FormHeader = () => {
  return (
    <Container className="text-center mb-4">
      <Image src="./raisely.png" style={{ maxWidth: "250px" }} />
      <h4 className="text-secondary text-muted">Sign Up Form</h4>
    </Container>
  );
};

export default FormHeader;
