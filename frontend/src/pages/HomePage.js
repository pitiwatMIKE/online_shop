import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "../components/CardProduct";
import Carousels from "../components/Carousels";
import LayoutContent from "../components/LayoutContent";
import {
  getProductLatest,
  selectorProduct,
} from "../reducers/products/productSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { values: products } = useSelector(selectorProduct);

  useEffect(() => {
    dispatch(getProductLatest(8));
  }, [dispatch]);

  return (
    <>
      <Carousels />
      <LayoutContent>
        <div className="letest-products my-5">
          <h3>LATEST PRODUCTS</h3>
          <div className="border-buttom-short mb-4"></div>

          <Row>
            {Array.isArray(products) &&
              products.map((item) => (
                <Col
                  className="my-5"
                  key={item.id}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  xxl='auto'
                  // xl={4}
                  // xxl={3}
                >
                  <CardProduct id={item.id} product={item} />
                </Col>
              ))}
          </Row>
        </div>
      </LayoutContent>
    </>
  );
}
