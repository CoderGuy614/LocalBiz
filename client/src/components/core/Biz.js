import React, { useState, useEffect } from "react";
import { getBusiness, getItems } from "./apiCore";
import { Row, Col, Container, Button } from "react-bootstrap";
import BizSidebar from "./BizSidebar";
import ItemCard from "./ItemCard";
import Layout from "./Layout";

const Biz = ({ match }) => {
  const { id } = match.params;
  const [business, setBusiness] = useState({});
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [hoursUpdated, setHoursUpdated] = useState(false);

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
    loadItems();
  }, []);

  useEffect(() => {
    loadBusiness();
  }, [hoursUpdated]);

  const sawHoursUpdate = () => {
    setHoursUpdated(!hoursUpdated);
  };

  const { name, description, photo, user, _id } = business;

  return (
    <Layout title={name} description={description} photo={photo} user={user}>
      <Container fluid>
        <Row>
          <Col sm={3}>
            <BizSidebar
              business={business}
              user={user}
              sawHoursUpdate={sawHoursUpdate}
            />
          </Col>
          <Col sm={9}>
            <Button href={`/post/item/${_id}`} block>
              {" "}
              Add An Item
            </Button>
            {items.length > 0 ? (
              items.map((item) => <ItemCard key={item._id} item={item} />)
            ) : (
              <div className="text-center mt-4">
                <h3>No Items to Show</h3>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Biz;
