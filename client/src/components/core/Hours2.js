import React from "react";
import Moment from "react-moment";
import { ListGroup, Table } from "react-bootstrap";

const Hours2 = ({}) => {
  const hoursArray = [
    {
      day: "Monday",
      closed: false,
      open: {
        hour: 8,
        minutes: 30,
      },
      close: {
        hour: 20,
        minutes: 30,
      },
    },
    {
      day: "Tuesday",
      closed: true,
      open: {
        hour: 8,
        minutes: 30,
      },
      close: {
        hour: 20,
        minutes: 30,
      },
    },
  ];

  const formatTime = (hour, minutes) => {
    if (hour > 12) {
      return hour - 12 + ":" + minutes + "pm";
    } else if (hour === 12) {
      return hour + ":" + minutes + "pm";
    } else {
      return hour + ":" + minutes + "am";
    }
  };

  const showClosed = (d) => {
    return (
      <td className="text-center" colSpan="2">
        Closed
      </td>
    );
  };

  const showHours = (d) => (
    <>
      <td>{formatTime(d.open.hour, d.open.minutes)}</td>
      <td>{formatTime(d.close.hour, d.close.minutes)}</td>
    </>
  );

  return (
    <>
      <h5 className="text-center mt-3">Hours of Operation</h5>
      <Table size="sm">
        <thead>
          <tr>
            <th>Day</th>
            <th>Open</th>
            <th>Close</th>
          </tr>
        </thead>
        <tbody>
          {hoursArray.map((d, i) => (
            <tr>
              <td>{d.day}</td>
              {d.closed ? showClosed(d) : showHours(d)}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Hours2;