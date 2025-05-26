import React, { useState } from "react";
import GoogleMap from "google-map-react";
import Pin from "../Layout/Pin";
import Hours from "./Hours";
import HoursModal from "./HoursModal";
import SettingsModal from "./SettingsModal";
import SetLocationModal from "./SetLocationModal";
import ContactInfo from "./ContactInfo";
import { Button, Container } from "react-bootstrap";

const BizSidebar = ({
  business,
  hoursUpdated,
  authUserId,
  token,
  setHoursUpdated,
  settingsUpdated,
  setSettingsUpdated,
  locationUpdated,
  setLocationUpdated,
}) => {
  const {
    hours,
    lat,
    lng,
    bizEmail,
    bizPhone,
    bizAddress,
    user,
    _id,
  } = business;

  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSetLocationModal, setShowSetLocationModal] = useState(false);

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
          <Pin lat={lat} lng={lng} />
        </GoogleMap>
      </Container>
      <Container className="mt-2">
        <p>
          <strong>Street Address:</strong> {bizAddress}
        </p>
      </Container>
      {user && authUserId && authUserId === user._id && (
        <Button
          block
          variant="secondary"
          className="my-3 mx-1"
          onClick={() => setShowSetLocationModal(true)}
        >
          <i className="fas fa-edit mr-2"></i>
          Edit Map Location
        </Button>
      )}

      <Container>
        <Hours hours={hours} id={_id} />
        <HoursModal
          bizId={_id}
          authUserId={authUserId}
          token={token}
          showHoursModal={showHoursModal}
          setShowHoursModal={setShowHoursModal}
          hoursUpdated={hoursUpdated}
          setHoursUpdated={setHoursUpdated}
        />
        <SettingsModal
          bizId={_id}
          authUserId={authUserId}
          token={token}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
          settingsUpdated={settingsUpdated}
          setSettingsUpdated={setSettingsUpdated}
        />

        <SetLocationModal
          bizId={_id}
          authUserId={authUserId}
          token={token}
          showSetLocationModal={showSetLocationModal}
          setShowSetLocationModal={setShowSetLocationModal}
          locationUpdated={locationUpdated}
          setLocationUpdated={setLocationUpdated}
        />
        <ContactInfo email={bizEmail} phone={bizPhone} />
        {user && authUserId && authUserId === user._id && (
          <>
            <Button
              block
              variant="secondary"
              onClick={() => setShowHoursModal(true)}
            >
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
          </>
        )}
      </Container>
    </>
  );
};

export default BizSidebar;
