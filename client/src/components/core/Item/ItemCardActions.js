import React from "react";
import { Container, Row, Accordion, Button, Card, Form } from "react-bootstrap";

const ItemCardActions = () => {
  return (
    <Container>
      <Row className="d-flex justify-content-center my-1">
        <Accordion defaultActiveKey="0" className="w-100">
          <Card className="bg-secondary">
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                style={{ height: "35px" }}
                variant="primary"
                eventKey="1"
              >
                Message Seller
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="Enter a message..."
                  />
                </Form.Group>
                <Button className="btn-secondary btn-sm"> Send </Button>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Row>
    </Container>
  );
};

export default ItemCardActions;
