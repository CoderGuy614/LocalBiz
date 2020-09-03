import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Pin from "../Layout/Pin";
import Hours from "./Hours";
import HoursModal from "./HoursModal";
import SettingsModal from "./SettingsModal";
import ContactInfo from "./ContactInfo";
import { Button, Container } from "react-bootstrap";

const BizSidebar = ({
  business,
  hoursUpdated,
  setHoursUpdated,
  settingsUpdated,
  setSettingsUpdated,
}) => {
  const { rating, hours, lat, lng, bizEmail, bizPhone, _id } = business;

  const [showModal, setShowModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const map = {
    key: {
      key: `${process.env.REACT_APP_MAP_KEY}`,
    },
    center: { lat, lng },
    zoom: 14,
  };

  return (
    <>
      <Container className="sidebar-map mb-2">
        <GoogleMap
          bootstrapURLKeys={map.key}
          center={map.center}
          zoom={map.zoom}
        >
          <Pin lat={lat} lng={lng} rating={rating} />
        </GoogleMap>
      </Container>
      <Container>
        <Hours hours={hours} id={_id} />
        <HoursModal
          id={_id}
          showModal={showModal}
          setShowModal={setShowModal}
          hoursUpdated={hoursUpdated}
          setHoursUpdated={setHoursUpdated}
        />
        <SettingsModal
          id={_id}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
          settingsUpdated={settingsUpdated}
          setSettingsUpdated={setSettingsUpdated}
        />
        <ContactInfo email={bizEmail} phone={bizPhone} />
        <Button block variant="secondary" onClick={() => setShowModal(true)}>
          <i className="fas fa-edit mr-2"></i>
          Edit Business Hours
        </Button>
        <Button
          block
          variant="info"
          className="mb-3"
          onClick={() => setShowSettingsModal(true)}
        >
          <i className="fas fa-cog mr-2"></i>
          Edit Business Profile
        </Button>
      </Container>
    </>
  );
};

export default BizSidebar;
