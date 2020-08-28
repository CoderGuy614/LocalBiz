import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Pin from "./Pin";
import Hours from "./Hours";
import ContactInfo from "./ContactInfo";

const BizSidebar = ({ business }) => {
  const { rating, hours, lat, lng, bizEmail, bizPhone } = business;

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
      <Hours hours={hours} />
      <ContactInfo email={bizEmail} phone={bizPhone} />
    </div>
  );
};

export default BizSidebar;
