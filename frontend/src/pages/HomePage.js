import React from "react";
import { Col, Row } from "react-bootstrap";
import CardProduct from "../components/CardProduct";
import Carousels from "../components/Carousels";
import LayoutContent from "../components/LayoutContent";

export default function HomePage() {
  return (
    <>
      <Carousels />
      <LayoutContent>
        <div className="letest-products my-5">
          <h3>LATEST PRODUCTS</h3>
          <div className="border-buttom-short mb-4"></div>

          <Row>
            {[...Array(8)].map((item, id) => (
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
