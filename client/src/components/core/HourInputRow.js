import React from "react";
import { Form } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";

const HourInputRow = ({ day, openTime, closeTime, handleTimeChange }) => {
  const handleOtherChange = (day) => {
    handleTimeChange();
    console.log(day);
  };
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
        <TimePicker value={openTime} onChange={() => handleOtherChange(day)} />
      </td>
      <td>
        <TimePicker value={closeTime} onChange={handleTimeChange} />
      </td>
    </tr>
  );
};

export default HourInputRow;
