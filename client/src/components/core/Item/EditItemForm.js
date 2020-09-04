import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Image, Spinner } from "react-bootstrap";
import { updateItem, getItem } from "../apiCore";

const EditItemForm = ({
  itemId,
  setShowEditModal,
  itemsUpdated,
  setItemsUpdated,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    business: "",
    inStock: true,
    canDeliver: true,
    photo: "",
    error: "",
    loading: false,
    formData: new FormData(),
  });

  const [photoName, setPhotoName] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    getItem(itemId)
      .then((response) => {
        const {
          name,
          description,
          price,
          inStock,
          canDeliver,
          photo,
          business,
        } = response;
        setValues({
          ...values,
          name,
          description,
          price,
          inStock,
          canDeliver,
          photo,
          business,
        });
        formData.set("name", name);
        formData.set("description", description);
        formData.set("price", price);
        formData.set("inStock", inStock);
        formData.set("canDeliver", canDeliver);
        formData.set("business", business);
        formData.set("photo", photo);
      })
      .catch((err) => console.log(err));
  }, []);

  const {
    name,
    description,
    price,
    photo,
    inStock,
    canDeliver,
    loading,
    error,
    formData,
  } = values;

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      setPhotoName(e.target.files[0].name);
    }
    formData.set(name, value);
    setValues({ ...values, error: "", [name]: value });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      setValues({ ...values, loading: true });
      updateItem(itemId, formData).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setItemsUpdated(!itemsUpdated);
          setValues({ ...values, loading: false });
          setShowEditModal(false);
        }
      });
    }
  };

  const showError = () => (
    <Alert variant="danger" style={{ display: error ? "" : "none" }}>
      {error}
    </Alert>
  );

  const showFileName = (fileName) =>
    photoName && (
      <Alert variant="info">
        <span className="text-success">{photoName}</span> Selected
      </Alert>
    );

  const showLoading = () => (
    <div className="d-flex justify-content-center my-4">
      <Spinner
        style={{ display: loading ? "" : "none" }}
        animation="border"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Item Name / Title"
          value={name}
          onChange={handleChange("name")}
        />
        <Form.Control.Feedback type="invalid">
          Please Enter Item Name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleChange("description")}
        />
        <Form.Control.Feedback type="invalid">
          Please Enter Item Description
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Price in $ USD"
          value={price}
          onChange={handleChange("price")}
        />
        <Form.Control.Feedback type="invalid">
          Please Enter A Price in $USD
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>In Stock / Available Now</Form.Label>
        <Form.Control
          as="select"
          type="large"
          value={inStock}
          onChange={handleChange("inStock")}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Delivery Available</Form.Label>
        <Form.Control
          as="select"
          type="large"
          value={canDeliver}
          onChange={handleChange("canDeliver")}
        >
          {" "}
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </Form.Control>
      </Form.Group>
      <h6>Current Photo</h6>
      {!photoName && <Image src={photo} thumbnail fluid className="my-2" />}

      <Form.Group>
        <Form.Label>Item Photo</Form.Label>
        <Form.File
          id="custom-file"
          label="Choose a Photo"
          name={photo}
          onChange={handleChange("photo")}
          custom
        />
      </Form.Group>
      {showFileName()}
      {showError()}
      {showLoading()}
      <Button type="submit" block>
        {" "}
        Save Changes
      </Button>
    </Form>
  );
};

export default EditItemForm;
