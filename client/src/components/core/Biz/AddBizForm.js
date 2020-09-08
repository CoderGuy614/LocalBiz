import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import Loading from "../Layout/Loading";
import { createBiz, getCategories } from "../apiCore";

const AddBizForm = ({ authUser }) => {
  const [values, setValues] = useState({
    name: "",
    category: "",
    description: "",
    bizEmail: "",
    bizPhone: "",
    photo: "",
    error: "",
    categories: [],
    loading: false,
    redirect: false,
    newBizId: "",
    formData: "",
  });

  const [photoName, setPhotoName] = useState("");
  const [validated, setValidated] = useState(false);

  const {
    name,
    description,
    bizEmail,
    bizPhone,
    photo,
    category,
    categories,
    redirect,
    newBizId,
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
      createBiz(formData, authUser._id).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            bizEmail: "",
            bizPhone: "",
            category: "",
            loading: false,
            error: "",
            redirect: true,
            newBizId: data._id,
          });
        }
      });
    }
  };

  const init = () => {
    setValues({ ...values, loading: true });
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          loading: false,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
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

  // const showLoading = () => (
  //   <div className="d-flex justify-content-center my-4">
  //     <Spinner
  //       style={{ display: loading ? "" : "none" }}
  //       animation="border"
  //       role="status"
  //     >
  //       <span className="sr-only">Loading...</span>
  //     </Spinner>
  //   </div>
  // );

  const showFileName = (fileName) =>
    photoName && (
      <Alert variant="info">
        <span className="text-success">{photoName}</span> Selected
      </Alert>
    );

  const redirectUser = () => {
    if (redirect && !error) {
      return <Redirect to={`/biz/${newBizId}`} />;
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Business Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Business Name"
            value={name}
            onChange={handleChange("name")}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Business Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            type="large"
            value={category}
            required={true}
            onChange={handleChange("category")}
          >
            <option value={""}>Choose a Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please Select a Category
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
            Please Enter A Description
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Business Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={bizEmail}
            onChange={handleChange("bizEmail")}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Business Email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Phone</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone"
            value={bizPhone}
            onChange={handleChange("bizPhone")}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter Business Phone Number
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Profile Photo</Form.Label>
          <Form.File
            required={false}
            id="custom-file"
            label="Choose a Photo"
            name={photo}
            onChange={handleChange("photo")}
            custom
          />
        </Form.Group>
        {showFileName()}
        <Button type="submit" block>
          {" "}
          Continue to Add Items
        </Button>
      </Form>
      <Loading loading={loading} />
      {showError()}
      {redirectUser()}
    </>
  );
};

export default AddBizForm;
