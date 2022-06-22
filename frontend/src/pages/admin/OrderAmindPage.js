import moment from "moment";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LayoutContent from "../../components/LayoutContent";
import OrderItemModal from "../../components/OrderItemModal";
import Loading from "../../components/Loading";
import {
  getOrdersShipping,
  selectorOrder,
  sendOrder,
} from "../../reducers/orders/orderSlice";
import AddressModal from "../../components/AddressModal";

export default function OrderAmindPage() {
  const [shippingStatus, setShippingStatus] = useState(false);
  const [orderItemModal, setOrderItemModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const { loading, values: orders } = useSelector(selectorOrder);

  useEffect(() => {
    dispatch(getOrdersShipping(shippingStatus));
  }, [dispatch, shippingStatus]);

  return (
    <LayoutContent>
      <div className="order-container">
        <button
          className="swap-btn"
          onClick={() => setShippingStatus(!shippingStatus)}
        >
          <i className="bi bi-arrow-repeat"></i>
          <span>{shippingStatus ? "Not Shipped" : "Shipped"}</span>
        </button>

        {loading ? (
          <Loading />
        ) : (
          <div>
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Address</th>
                  <th>User Email</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Shipped</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="order-item">
                    <td>{moment(order.createdAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderId(order.id);
                          setOrderItemModal(true);
                        }}
                      >
                        <i className="bi bi-box-seam"></i> Products
                      </Link>
                    </td>
                    <td>
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          setUserAddress(order.User.Address);
                          setAddressModal(true);
                        }}
                      >
                        <i className="bi bi-house-door"></i> Address
                      </Link>
                    </td>
                    <td>{order.User.email}</td>
                    <td>฿ {order.total}</td>
                    <td className="text-center">
                      {order.paymentStatus ? (
                        <img src={"/check.png"} alt="check_image" />
                      ) : (
                        <img src={"/wrong.png"} alt="wrong_image" />
                      )}
                    </td>
                    <td className="text-center">
                      {order.shippingStatus ? (
                        <img src={"/check.png"} alt="check_image" />
                      ) : (
                        <div className="send-btn">
                          <button onClick={() => dispatch(sendOrder(order.id))}>
                            Send
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {!orders.length && <h1 className="my-5 text-center">EMPTY.</h1>}
          </div>
        )}
      </div>

      {userAddress && (
        <AddressModal
          show={addressModal}
          onHide={() => setAddressModal(false)}
          useraddress={userAddress}
        />
      )}

      {orderId && (
        <OrderItemModal
          show={orderItemModal}
          onHide={() => setOrderItemModal(false)}
          orderid={orderId}
        />
      )}
    </LayoutContent>
  );
}
