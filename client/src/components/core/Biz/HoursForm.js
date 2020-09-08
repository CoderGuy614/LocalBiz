import React, { useState, useEffect } from "react";
import { Container, Button, Table, Alert } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { getHours, updateHours } from "../apiCore";
import HourInputRow from "./HourInputRow";

const HoursForm = ({
  bizId,
  authUserId,
  hoursUpdated,
  setHoursUpdated,
  setShowModal,
}) => {
  const [values, setValues] = useState({
    Monday: {
      open: "",
      close: "",
      isClosed: false,
    },
    Tuesday: {
      open: "",
      close: "",
      isClosed: false,
    },
    Wednesday: {
      open: "",
      close: "",
      isClosed: false,
    },
    Thursday: {
      open: "",
      close: "",
      isClosed: false,
    },
    Friday: {
      open: "",
      close: "",
      isClosed: false,
    },
    Saturday: {
      open: "",
      close: "",
      isClosed: false,
    },
    Sunday: {
      open: "",
      close: "",
      isClosed: false,
    },
  });

  useEffect(() => {
    setLoading(true);
    getHours(bizId)
      .then(({ hours }) => {
        setValues(hours);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    updateHours(values, bizId, authUserId).then((data) => {
      console.log(data);
      setLoading(false);
      setShowModal(false);
      setHoursUpdated(!hoursUpdated);
    });
  };

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

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
      <Loading loading={loading} />
      {showError()}
      <Button block onClick={handleSubmit} className="mb-3">
        Save Changes
      </Button>
    </Container>
  );
};

export default HoursForm;
