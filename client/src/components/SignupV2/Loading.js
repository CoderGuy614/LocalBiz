import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = ({ loading }) => {
  return (
    <div className="d-flex justify-content-center my-4">
      <Spinner
        style={{ display: loading ? "" : "none" }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
