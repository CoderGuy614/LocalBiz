import React, { useState, useEffect } from "react";
import { getBusiness, getItems } from "./apiCore";
import { Row, Col, Container } from "react-bootstrap";
import ItemCard from "./ItemCard";
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

  const { city, hours, lat, lng, user, rating, photo, date } = business;

  return (
    <Layout title={business.name} description={business.description}>
      <Container>
        <Row>
          <Col sm={4}>This is the SideBar</Col>
          <Col sm={8}>
            {items.length > 0 &&
              items.map((item) => <ItemCard key={item._id} item={item} />)}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Biz;
