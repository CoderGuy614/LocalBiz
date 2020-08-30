import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Layout from "./Layout";
import HourInputRow from "./HourInputRow";
const HoursForm = () => {
  const [values, setValues] = useState({
    Monday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
    Tuesday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
    Wednesday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
    Thursday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
    Friday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
    Saturday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
    Sunday: {
      open: "12:00 AM",
      close: "12:00 AM",
      isClosed: false,
    },
  });

  const handleTimeChange = (day, openOrClose) => (e) => {
    if (openOrClose === "open") {
      const prevState = values[day];
      prevState.open = e.target.value;
      setValues({ ...values, [day]: prevState });
    } else if (openOrClose === "close") {
      const prevState = values[day];
      prevState.close = e.target.value;
      setValues({ ...values, [day]: prevState });
    }
  };

  const handleIsClosed = (e, day) => {
    const prevState = values[day];
    prevState.isClosed = e.target.checked;
    setValues({ ...values, [day]: prevState });
  };

  const daysArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
            {daysArray.map((d, i) => (
              <HourInputRow
                key={i}
                day={d}
                openTime={values[d].open}
                closeTime={values[d].close}
                isClosed={values[d].isClosed}
                handleIsClosed={handleIsClosed}
                handleTimeChange={handleTimeChange}
              />
            ))}
          </tbody>
        </Table>
        <Button block>Save Changes</Button>
      </Container>
    </Layout>
  );
};

export default HoursForm;
