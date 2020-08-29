import React from "react";
import { Form } from "react-bootstrap";
import TimePicker from "./TimePicker";

const HourInputRow = ({
  day,
  openTime,
  closeTime,
  isClosed,
  handleIsClosed,
  handleTimeChange,
}) => {
  return (
    <tr>
      <td>{day}</td>
      <td>
        <div className="d-flex justify-content-center">
          <Form.Check
            type="checkbox"
            onChange={(e) => handleIsClosed(e, day)}
            style={{
              transform: "scale(2, 2)",
            }}
          />
        </div>
      </td>
      <td>
        <TimePicker
          value={openTime}
          handleTimeChange={handleTimeChange}
          openOrClose="open"
          isClosed={isClosed}
          day={day}
        />
      </td>
      <td>
        <TimePicker
          value={closeTime}
          handleTimeChange={handleTimeChange}
          openOrClose="close"
          isClosed={isClosed}
          day={day}
        />
      </td>
    </tr>
  );
};

export default HourInputRow;
