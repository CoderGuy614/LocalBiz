import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Pin from "./Pin";
import Hours from "./Hours";
import HoursModal from "./HoursModal";
import ContactInfo from "./ContactInfo";
import { Button } from "react-bootstrap";

const BizSidebar = ({ business, sawHoursUpdate }) => {
  const { rating, hours, lat, lng, bizEmail, bizPhone, _id } = business;

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

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
      <Button block variant="primary" onClick={handleShow}>
        Edit Business Hours
      </Button>
      <HoursModal
        id={_id}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        sawHoursUpdate={sawHoursUpdate}
      />
      <ContactInfo email={bizEmail} phone={bizPhone} />
    </div>
  );
};

export default BizSidebar;
