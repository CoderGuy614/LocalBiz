import React, { useState } from "react";
import { Form, Container, Button, Row, Col, Table } from "react-bootstrap";
import Layout from "./Layout";
import TimePicker from "react-bootstrap-time-picker";

const HoursForm = () => {
  const [monday, setMonday] = useState({
    day: "Monday",
    closed: true,
    open: {
      hour: 9,
      minute: "00",
    },
    close: {
      hour: 17,
      minute: "00",
    },
  });

  return (
    <Layout
      title="Set Business Hours"
      description="Enter Your Business Hours Below"
    >
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Day</th>
              <th style={{ width: "50px" }}>Closed</th>
              <th>Open</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monday</td>
              <td>
                <div className="d-flex justify-content-center">
                  <Form.Check
                    style={{
                      transform: "scale(2, 2)",
                    }}
                  />
                </div>
              </td>
              <td>
                <TimePicker />
              </td>
              <td>
                <TimePicker />
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default HoursForm;
