import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import { getHours, updateHours } from "./apiCore";
import HourInputRow from "./HourInputRow";

const HoursForm = ({ id, sawHoursUpdate }) => {
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
    getHours(id)
      .then(({ hours }) => setValues(hours))
      .catch((err) => console.log(err));
  }, []);

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
    updateHours(values, id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        sawHoursUpdate();
      }
    });
  };

  const redirectUser = () => {
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
      <Button block onClick={handleSubmit} className="mb-3">
        Save Changes
      </Button>
      {redirectUser()}
    </Container>
  );
};

export default HoursForm;
