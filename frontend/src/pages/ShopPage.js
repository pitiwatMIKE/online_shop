import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CardProduct from "../components/CardProduct";
import LayoutContent from "../components/LayoutContent";
import {
  getProducts,
  selectorProduct,
} from "../reducers/products/productSlice";
import Error from "../components/Error";
import Loading from "../components/Loading";

export default function Shop() {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    errMessage,
    values: products,
  } = useSelector(selectorProduct);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LayoutContent>
          <div className="header-content my-5">
            <h3>ALL PRODUCTS</h3>
            <div className="border-buttom-short"></div>
          </div>
          <div className="main-content">
            {error && <Error msg={errMessage} />}
            <Row>
              {Array.isArray(products) &&
                products.map((item) => (
                  <Col
                    className="my-4"
                    key={item.id}
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    xl={4}
                    xxl={3}
                  >
                    <CardProduct id={item.id} product={item} />
                  </Col>
                ))}
            </Row>
          </div>
        </LayoutContent>
      )}
    </>
  );
}
