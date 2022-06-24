import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeQty,
  deleteCard,
  getCard,
  selectorCart,
} from "../reducers/products/cartSlice";

export default function CartModal(props) {
  const { onHide } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values: cart, total } = useSelector(selectorCart);

  useEffect(() => {
    dispatch(getCard());
  }, [dispatch]);

  return (
    <Modal {...props} className="cart-modal" scrollable size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Shoping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!cart.length && (
          <div className="text-center my-5">
            <h5>YOUR CART IS CURRENTLY EMPTY.</h5>
          </div>
        )}
        {!cart.length || (
          <div className="shopping-cart">
            {cart.map((product) => (
              <div key={product.id}>
                <div className="product-cart">
                  <img src={product.imageProduct} alt="product_image" />
                  <div className="product-name">{product.name}</div>
                  <div className="product-qty">
                    <input
                      type="number"
                      name="qty"
                      value={product.qty}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) =>
                        e.target.value === "" &&
                        dispatch(changeQty({ id: product.id, qty: 1 }))
                      }
                      onChange={(e) =>
                        dispatch(
                          changeQty({ id: product.id, qty: e.target.value })
                        )
                      }
                    />
                  </div>
                  <div className="product-price">฿ {product.price}</div>
                  <div
                    className="cart-delete"
                    onClick={() => dispatch(deleteCard(product.id))}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </div>
                </div>
                <hr />
              </div>
            ))}

            <div className="cart-total">
              <div>Shipping caclulated checkout</div>
              <div>SUBTOTAL ฿ {total}</div>
            </div>
          </div>
        )}
        <Modal.Footer>
          <div className="cart-footer">
            {!cart.length && (
              <button className="btn-show-now" onClick={onHide}>
                SHOP NOW
              </button>
            )}

            {!cart.length || (
              <div>
                <button className="btn-cancel" onClick={onHide}>
                  CONTINUE SHOPPING
                </button>
                <button
                  className="btn-check-out"
                  onClick={() => {
                    onHide();
                    navigate(`/checkout`);
                  }}
                >
                  CHECK OUT
                </button>
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
