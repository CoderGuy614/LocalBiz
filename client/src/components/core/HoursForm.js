import React, { useState } from "react";
import { Form, Container, Button, Row, Col, Table } from "react-bootstrap";
import Layout from "./Layout";
import HourInputRow from "./HourInputRow";
const HoursForm = () => {
  //   const [values, setValues] = useState({
  //     Monday: {
  //       open: 0,
  //       close: 0,
  //     },
  //     Tuesday: {
  //       open: 0,
  //       close: 0,
  //     },
  //   });

  const [openTimes, setOpenTimes] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  const [closeTimes, setCloseTimes] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  const [isClosed, setIsClosed] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const handleTimeChange = (day, openOrClose) => (e) => {
    console.log(e.target.value);
    if (openOrClose === "open") {
      console.log("OPEN TIME is", day);
    } else {
      console.log("CLOSE TIME is", day);
    }
  };

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
            <HourInputRow
              day="Monday"
              openTime={openTimes.Monday}
              closeTime={closeTimes.Tuesday}
              handleTimeChange={handleTimeChange}
            />
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default HoursForm;
