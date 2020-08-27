import React from "react";

const Pin = ({ lat, lng, rating }) => {
  return (
    <div className="pin" lat={lat} lng={lng}>
      {rating ? <label>{rating.toFixed(2)}</label> : null}
    </div>
  );
};

export default Pin;
