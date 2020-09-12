import React, { useState, useEffect } from "react";
import GoogleMap from "google-map-react";
import { Redirect } from "react-router-dom";
import { Container, Form, Col, Button, Alert, Image } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { getBusiness, updateLocation, getCurrentLocation } from "../apiCore";
import LeafletMap from "./LeafletMap";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  bizEmail: yup.string().email().required(),
  bizPhone: yup.string().required(),
});
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
    lat: "",
    lng: "",
  });

  //   const map = {
  //     key: {
  //       key: `${process.env.REACT_APP_MAP_KEY}`,
  //     },
  //     center: { location.lat, location.lng },
  //     zoom: 14,
  //   };

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

  const showError = () => (
    <Alert
      variant="danger"
      className="mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </Alert>
  );

  return (
    <>
      <div className="leaflet-container">
        <Map center={[45.4, -75.7]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
      <Formik
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={async (values) => {
          setLoading(true);

          const response = await updateLocation(
            location,
            bizId,
            authUserId,
            token
          );
          if (response.error) {
            setError(response.error);
            setLoading(false);
          } else {
            setLoading(false);
            setShowSetLocationModal(false);
            setLocationUpdated(!locationUpdated);
          }
        }}
        initialValues={{
          lat: location.lat,
          lng: location.lng,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className="mt-4">
            {/* First Row */}
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik01">
                <Form.Label>Lat</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name..."
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name && touched.name}
                />

                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  Please Enter a Name
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            {/* Second Row */}
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="validationFormik03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description..."
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={!!errors.description && touched.description}
                />
                <Form.Control.Feedback />
                <Form.Control.Feedback type="invalid">
                  Please Enter a Description
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button
                onClick={() => console.log(getCurrentLocation(token))}
                block
              >
                Get Current Location
              </Button>
            </Form.Row>
            {/*  Button Row */}
            {loading && <Loading loading={loading} />}

            <Form.Row className="my-3 d-flex justify-content-between">
              <Button type="submit">Save Changes</Button>
            </Form.Row>
            {showError()}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LocationForm;
