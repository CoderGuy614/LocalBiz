import React from "react";
import { Form } from "react-bootstrap";
import TimePicker from "./TimePicker";

const HourInputRow = ({ day, openTime, closeTime, handleTimeChange }) => {
  return (
    <tr>
      <td>{day}</td>
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
        <TimePicker
          handleTimeChange={handleTimeChange}
          openOrClose="open"
          day={day}
        />
      </td>
      <td>
        <TimePicker
          handleTimeChange={handleTimeChange}
          openOrClose="close"
          day={day}
        />
      </td>
    </tr>
  );
};

export default HourInputRow;
