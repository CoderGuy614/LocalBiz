import React from "react";
import { Table, Button } from "react-bootstrap";

const Hours = ({ hours, id }) => {
  const showClosed = (d) => {
    return (
      <td className="text-center" colSpan="2">
        Closed
      </td>
    );
  };

  const showHours = (d) => (
    <>
      <td>{hours && hours[d].open}</td>
      <td>{hours && hours[d].close}</td>
    </>
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

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
          {days.map((d, i) => (
            <tr key={i}>
              <td>{d}</td>
              {hours && hours[d].isClosed ? showClosed(d) : showHours(d)}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button href={`/post/hours/${id}`} block>
        Update Hours
      </Button>
    </>
  );
};

export default Hours;
