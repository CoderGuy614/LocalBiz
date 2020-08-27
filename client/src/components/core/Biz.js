import React, { useState, useEffect } from "react";
import { getBusiness, getItems } from "./apiCore";
import { Row, Col, Container } from "react-bootstrap";
import BizSidebar from "./BizSidebar";
import ItemCardHorizontal from "./ItemCardHorizontal";
import Layout from "./Layout";

const Biz = ({ match }) => {
  const { id } = match.params;
  const [business, setBusiness] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const loadBusiness = () => {
    getBusiness(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setBusiness(data);
      }
    });
  };

  const loadItems = () => {
    getItems(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setItems(data);
      }
    });
  };

  useEffect(() => {
    loadBusiness();
    loadItems();
  }, []);

  const { name, description, photo } = business;

  return (
    <Layout title={name} description={description} photo={photo}>
      <Container fluid>
        <Row>
          <Col sm={3}>
            <BizSidebar business={business} />
          </Col>
          <Col sm={9}>
            {items.length > 0 &&
              items.map((item) => (
                <ItemCardHorizontal key={item._id} item={item} />
              ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Biz;
