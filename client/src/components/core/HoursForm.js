import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import Layout from "./Layout";
import { updateHours } from "./apiCore";
import HourInputRow from "./HourInputRow";

const HoursForm = ({ match }) => {
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

  const handleSubmit = () => {
    updateHours(values).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
      }
    });
  };

  const redirectUser = () => {
    const id = match.params.bizId;
    if (success && !error) {
      return <Redirect to={`/biz/${id}`} />;
    }
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
        <Button block onClick={handleSubmit}>
          Save Changes
        </Button>
      </Container>
      {redirectUser()}
    </Layout>
  );
};

export default HoursForm;
