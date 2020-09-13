import React, { useState, useEffect } from "react";
import GoogleMap from "google-map-react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { getBusiness, updateLocation } from "../apiCore";

const LocationForm = ({
  bizId,
  authUserId,
  token,
  locationUpdated,
  setLocationUpdated,
  setShowSetLocationModal,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
  });
  const [markers, setMarkers] = useState([]);
  const [newLocation, setNewLocation] = useState(null);

  useEffect(() => {
    setLoading(true);
    getBusiness(bizId)
      .then((b) => {
        setLocation({ lat: b.lat, lng: b.lng });
        setLoading(false);
      })
      .catch((err) => setError(err));
    //eslint-disable-next-line
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    updateLocation(newLocation, bizId, authUserId, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setLoading(false);
      }
      setLocationUpdated(!locationUpdated);
      setShowSetLocationModal(false);
    });
  };

  const showError = () => (
    <Alert
      variant="danger"
      className="mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  const { lat, lng } = location;

  const map = {
    key: {
      key: `${process.env.REACT_APP_MAP_KEY}`,
    },
    center: { lat, lng },
    zoom: 14,
  };

  const latLng = [lat, lng];

  const handleApiLoaded = (map, maps) => {
    const currentMarker = new maps.Marker({
      map: map,
      position: location,
      draggable: false,
      clickable: false,
      icon: "http://maps.google.com/mapfiles/kml/shapes/arrow.png",
    });

    function addMarker(latLng) {
      const newMarker = new maps.Marker({
        map: map,
        position: latLng,
        draggable: true,

        icon: "http://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
      });
      setNewLocation(newMarker.getPosition().toJSON());
      newMarker.addListener("dragend", function () {
        setNewLocation(newMarker.getPosition().toJSON());
      });
      setMarkers([...markers, markers.push(newMarker)]);
    }

    map.addListener("click", function (e) {
      if (markers.length < 1) {
        addMarker(e.latLng);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Container>
          <p>1. Click the map to drop a Pin</p>
          <p>2. Drag the Pin to your location</p>
          <p>3. Click "Save Location"</p>
        </Container>
      </Row>
      <Row className="set-location-map mb-2">
        <GoogleMap
          bootstrapURLKeys={map.key}
          center={map.center}
          zoom={map.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ></GoogleMap>
      </Row>
      <Loading loading={loading} />
      <Row className="my-3">
        {showError()}
        <Button block onClick={handleSubmit}>
          Save Location
        </Button>
      </Row>
    </Container>
  );
};

export default LocationForm;
