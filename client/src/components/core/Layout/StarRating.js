import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { MDBBadge } from "mdbreact";

const StarRating = ({ rating }) => {
  return (
    <MDBBadge color="info">
      <div>
        {[...Array(rating)].map((star, i) => {
          return (
            <i style={{ color: "gold" }} className="fas fa-star" key={i}></i>
          );
        })}
        {[...Array(5 - rating)].map((star, i) => {
          return <i className="far fa-star" key={i}></i>;
        })}
      </div>
    </MDBBadge>
  );
};

export default StarRating;
