import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Image } from "react-bootstrap";
import { updateItem, getItem } from "../apiCore";

const EditItemForm = ({ itemId, setSuccess }) => {
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
    e.preventDefault();

    updateItem(itemId, formData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSuccess(true);
      }
    });
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

  const showLoading = () => loading && <Alert variant="info">Loading...</Alert>;

  return (
    <Form>
      <Form.Group>
        <Form.Label>Item Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Item Name / Title"
          value={name}
          onChange={handleChange("name")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleChange("description")}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Price in $ USD"
          value={price}
          onChange={handleChange("price")}
        />
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
      <Button type="submit" onClick={handleSubmit} block>
        {" "}
        Save Changes
      </Button>
    </Form>
  );
};

export default EditItemForm;
