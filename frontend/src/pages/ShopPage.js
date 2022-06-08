import React from "react";
import { Col, Row } from "react-bootstrap";
import CardProduct from "../components/CardProduct";
import LayoutContent from "../components/LayoutContent";

export default function Shop() {
  return (
    <>
      <LayoutContent>
        <div className="header-content my-5">
          <h3>ALL PRODUCTS</h3>
          <div className="border-buttom-short"></div>
        </div>
        <div className="main-content">
          <Row>
            {[...Array(10)].map((item, id) => (
              <Col
                className="my-4"
                key={id}
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={4}
                xxl={3}
              >
                <CardProduct />
              </Col>
            ))}
          </Row>
        </div>
      </LayoutContent>
    </>
  );
}
