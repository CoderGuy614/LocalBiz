import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Layout from "./Layout";
import HourInputRow from "./HourInputRow";
const HoursForm = () => {
  const [openTimes, setOpenTimes] = useState({
    Monday: "12:00 AM",
    Tuesday: "12:00 AM",
    Wednesday: "12:00 AM",
    Thursday: "12:00 AM",
    Friday: "12:00 AM",
    Saturday: "12:00 AM",
    Sunday: "12:00 AM",
  });

  const [closeTimes, setCloseTimes] = useState({
    Monday: "12:00 AM",
    Tuesday: "12:00 AM",
    Wednesday: "12:00 AM",
    Thursday: "12:00 AM",
    Friday: "12:00 AM",
    Saturday: "12:00 AM",
    Sunday: "12:00 AM",
  });

  const [isClosed, setIsClosed] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const handleTimeChange = (day, openOrClose) => (e) => {
    if (openOrClose === "open") {
      setOpenTimes({ ...openTimes, [day]: e.target.value });
    } else {
      setCloseTimes({ ...closeTimes, [day]: e.target.value });
    }
  };

  const handleIsClosed = (e, day) => {
    setIsClosed({ ...isClosed, [day]: e.target.checked });
  };

  return (
    <Layout
      title="Set Business Hours"
      description="Enter Your Business Hours Below"
    >
      <Container className="border-bottom mb-3">
        <Table>
          <thead>
            <tr>
              <th>Day</th>
              <th style={{ width: "50px" }}>Closed</th>
              <th className="text-center">Open</th>
              <th className="text-center">Close</th>
            </tr>
          </thead>
          <tbody>
            <HourInputRow
              day="Monday"
              openTime={openTimes.Monday}
              closeTime={closeTimes.Monday}
              isClosed={isClosed.Monday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
            <HourInputRow
              day="Tuesday"
              openTime={openTimes.Tuesday}
              closeTime={closeTimes.Tuesday}
              isClosed={isClosed.Tuesday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
            <HourInputRow
              day="Wednesday"
              openTime={openTimes.Wednesday}
              closeTime={closeTimes.Wednesday}
              isClosed={isClosed.Wednesday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
            <HourInputRow
              day="Thursday"
              openTime={openTimes.Thursday}
              closeTime={closeTimes.Thursday}
              isClosed={isClosed.Thursday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
            <HourInputRow
              day="Friday"
              openTime={openTimes.Friday}
              closeTime={closeTimes.Friday}
              isClosed={isClosed.Friday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
            <HourInputRow
              day="Saturday"
              openTime={openTimes.Saturday}
              closeTime={closeTimes.Saturday}
              isClosed={isClosed.Saturday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
            <HourInputRow
              day="Sunday"
              openTime={openTimes.Sunday}
              closeTime={closeTimes.Sunday}
              isClosed={isClosed.Sunday}
              handleIsClosed={handleIsClosed}
              handleTimeChange={handleTimeChange}
            />
          </tbody>
        </Table>
        <Button block>Save Changes</Button>
      </Container>
    </Layout>
  );
};

export default HoursForm;
