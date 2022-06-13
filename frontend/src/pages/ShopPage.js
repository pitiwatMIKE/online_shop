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
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

export default function Shop() {
  const { page, search } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    errMessage,
    values: { products, maxPage },
  } = useSelector(selectorProduct);

  useEffect(() => {
    dispatch(getProducts({ page, search }));
  }, [dispatch, page, search]);

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
          <div className="my-5" style={{display: 'flex', justifyContent: 'center'}}>
            <Paginate count={2} page={page} search={search} maxPage={maxPage} />
          </div>
        </LayoutContent>
      )}
    </>
  );
}
