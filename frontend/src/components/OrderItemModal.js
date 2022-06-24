import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderItems,
  selectorOrderItem,
} from "../reducers/orders/orderItemSlice";

export default function OrderItemModal(props) {
  const { orderid, userid } = props;
  const dispatch = useDispatch();
  const { values: orderItems } = useSelector(selectorOrderItem);

  useEffect(() => {
    dispatch(getOrderItems(orderid, userid));
  }, [dispatch, orderid, userid]);

  return (
    <Modal {...props} className="cart-modal" scrollable size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="order-item-container">
          <div className="column">
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
          </div>
          <hr />
          {orderItems.map((product, index) => (
            <div key={product.id}>
              <div className="table-item">
                <div>
                  <img src={product.imageProduct} alt="product_image" />
                </div>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.qty}</div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
