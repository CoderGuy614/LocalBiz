import React from "react";
import Layout from "../Layout";
import { Container } from "react-bootstrap";
import AddItemForm from "./AddItemForm";

const AddItemPage = ({ match }) => {
  return (
    <Layout title="Create Item" description="Enter Item Details Below">
      <Container>
        <AddItemForm id={match.params.bizId} />
      </Container>
    </Layout>
  );
};

export default AddItemPage;
