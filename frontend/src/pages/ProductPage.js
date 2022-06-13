import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { getProduct, selectorProduct } from "../reducers/products/productSlice";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    errMessage,
    values: product,
  } = useSelector(selectorProduct);
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={errMessage} />
      ) : product ? (
        <div className="product-container">
          <div className="show-product">
            <img src={product.imageUrl} alt="product_image" />
          </div>
          <div className="product-detail">
            <h3>{product.name}</h3>
            <div className="product-price">{product.price} ฿</div>
            <p className="product-description">{product.desc}</p>
            <div className="add-product">
              <div>
                <input type="number" min="1" max="99" />
              </div>
              <div>
                <button>Add To Card</button>
              </div>
              <div className="buy-now">
                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
