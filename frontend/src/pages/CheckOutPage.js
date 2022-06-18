import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartModal from "../components/CartModal";
import FormAddress from "../components/FormAddress";
import { getCard, selectorCart } from "../reducers/products/cartSlice";

export default function CheckOutPage() {
  const [cartModalShow, setCartModalModalShow] = useState(false);

  const dispatch = useDispatch();
  const { values: cart, total } = useSelector(selectorCart);

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  return (
    <div className="checkout-container">
      <div className="checkout-step">
        <div>1. SUMMARY</div>
        <div className="checkout-line"></div>
        <div>2. SHIPPING</div>
        <div className="checkout-line"></div>
        <div>3. PATMENT</div>
      </div>

      <div className="your-order">
        <div className="title">
          <h2>YOUR ORDER</h2>
        </div>

        {/* Summary */}
        <div className="summary">
          <p>1. SUMMARY</p>
          <hr />
          <div className="update-summary">
            <button onClick={() => setCartModalModalShow(true)}>UPDATE</button>
          </div>
          <div className="all-proucts">
            <div className="col-product">
              <div>Image</div>
              <div className="col-name">Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total price</div>
            </div>

            <div
              className="product-wrap"
              style={
                cart.length > 4 ? { height: 400, overflowY: "scroll" } : {}
              }
            >
              {cart.map((product) => (
                <div key={product.id} className="product-items">
                  <div className="image">
                    <img src={product.imageUrl} alt="image_produt" />
                  </div>
                  <div className="name">{product.name}</div>
                  <div className="price">฿ {product.price}</div>
                  <div className="qty">{product.qty}</div>
                  <div className="total-price">
                    ฿ {Number(product.qty) * Number(product.price)}
                  </div>
                </div>
              ))}
              <div className="summary-total">
                <h5>Total: ฿ {total}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="shipping">
          <p>2. SHIPING</p>
          <hr />
          <FormAddress />
        </div>

        {/* Payment */}
        <div className="payment">
          <p>3. PAYMENT</p>
          <hr />

          <div className="payment-detail">
            <div className="subtotal">
              <div>Subtoal</div>
              <div>฿ {total}</div>
            </div>

            <div className="shipping-price">
              <div>Shipping</div>
              <div>฿ {50}</div>
            </div>
          </div>
          <hr />

          <div className="total">
            <div>Total</div>
            <div>฿ {Number(total) + 50}</div>
          </div>
          <hr />

          <div className="btn-payment">
            <button> PLACE ORDER</button>
          </div>
        </div>

        <div className="payment-bottom"></div>
      </div>

      <CartModal
        show={cartModalShow}
        onHide={() => setCartModalModalShow(false)}
      />
    </div>
  );
}
