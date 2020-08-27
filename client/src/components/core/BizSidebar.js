import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Pin from "./Pin";
import { Card, Image, Container, Row, Col } from "react-bootstrap";

const BizSidebar = ({ business }) => {
  const { name, description, photo, rating, hours, lat, lng } = business;

  const map = {
    key: {
      key: `${process.env.REACT_APP_MAP_KEY}`,
    },
    center: { lat, lng },
    zoom: 14,
  };

  return (
    <div className="sidebar-map">
      <GoogleMap bootstrapURLKeys={map.key} center={map.center} zoom={map.zoom}>
        <Pin lat={lat} lng={lng} rating={rating} />
      </GoogleMap>
    </div>
  );
};

export default BizSidebar;
