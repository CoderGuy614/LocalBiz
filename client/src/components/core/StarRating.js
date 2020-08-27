import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

const StarRating = ({ rating }) => {
  console.log(rating);
  return (
    <div className="bg-primary rating">
      <Row className="justify-content-center pt-2">
        <p>Rating</p>
      </Row>
      <Row>
        <span className="ml-4">
          {[...Array(rating)].map((star, i) => {
            return (
              <i style={{ color: "gold" }} className="fas fa-star" key={i}></i>
            );
          })}
          {[...Array(5 - rating)].map((star, i) => {
            return <i className="far fa-star" key={i}></i>;
          })}
        </span>
      </Row>
    </div>
  );
};

export default StarRating;
