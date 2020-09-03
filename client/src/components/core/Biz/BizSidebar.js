import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Pin from "../Layout/Pin";
import Hours from "./Hours";
import HoursModal from "./HoursModal";
import ContactInfo from "./ContactInfo";
import { Button } from "react-bootstrap";

const BizSidebar = ({ business, hoursUpdated, setHoursUpdated }) => {
  const { rating, hours, lat, lng, bizEmail, bizPhone, _id } = business;

  const [showModal, setShowModal] = useState(false);

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
      <Hours hours={hours} id={_id} />
      <Button block variant="secondary" onClick={() => setShowModal(true)}>
        <i className="fas fa-edit mr-2"></i>
        Edit Business Hours
      </Button>
      <HoursModal
        id={_id}
        showModal={showModal}
        setShowModal={setShowModal}
        hoursUpdated={hoursUpdated}
        setHoursUpdated={setHoursUpdated}
      />
      <ContactInfo email={bizEmail} phone={bizPhone} />
      <Button block variant="info" className="mb-3">
        <i className="fas fa-cog mr-2"></i>
        Edit Settings
      </Button>
    </div>
  );
};

export default BizSidebar;
