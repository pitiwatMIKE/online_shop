import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CartModal from "../components/CartModal";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { buyNow, setCart } from "../reducers/products/cartSlice";
import { getProduct, selectorProduct } from "../reducers/products/productSlice";

export default function ProductPage() {
  const [cartModalShow, setCartModalModalShow] = useState(false);
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
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
        <>
          <div className="product-container">
            <div className="show-product">
              <img src={product.imageProduct} alt="product_image" />
            </div>
            <div className="product-detail">
              <h3>{product.name?.toUpperCase()}</h3>
              <div className="product-price">฿ {product.price}</div>
              <p className="product-description">{product.desc}</p>
              <div className="add-product">
                <div>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={qty}
                    onFocus={(e) => e.target.select()}
                    onBlur={(e) => {
                      let _qty = Number(e.target.value);
                      _qty = isNaN(_qty) ? 1 : _qty;
                      _qty = _qty <= 0 ? 1 : _qty;
                      setQty(_qty);
                    }}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    onClick={() => {
                      dispatch(setCart({ ...product, qty: qty }));
                      setCartModalModalShow(true);
                    }}
                  >
                    Add To Card
                  </button>
                </div>
                <div className="buy-now">
                  <button
                    onClick={() => {
                      dispatch(buyNow([{ ...product, qty: 1 }]));
                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CartModal
            show={cartModalShow}
            onHide={() => setCartModalModalShow(false)}
          />
        </>
      ) : null}
    </>
  );
}
