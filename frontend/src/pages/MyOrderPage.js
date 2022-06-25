import React, { useEffect, useState } from "react";
import Moment from "moment";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LayoutContent from "../components/LayoutContent";
import { getOrders, selectorOrder } from "../reducers/orders/orderSlice";
import { clearCart } from "../reducers/products/cartSlice";
import OrderItemModal from "../components/OrderItemModal";
import { logout, selectorAuth } from "../reducers/users/authSlice";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

export default function MyOrderPage() {
  const [shippingStatus, setShippingStatus] = useState(false);
  const [orderItemModal, setOrderItemModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values: userAuth } = useSelector(selectorAuth);
  const { loading, values: orders } = useSelector(selectorOrder);

  useEffect(() => {
    if (!userAuth) {
      dispatch(logout());
      navigate("/signin");
    } else {
      dispatch(clearCart());
      dispatch(getOrders(shippingStatus));
    }
  }, [dispatch, navigate, userAuth, shippingStatus]);

  return (
    <LayoutContent>
      <div className="admin-table-container">
        <h2>MY ORDERS</h2>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Table bordered hover responsive="sm">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Detail</th>
                  <th>Sub Total</th>
                  <th>Shipping Price</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Shipped</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="table-item">
                    <td>{Moment(order.createdAt).format("DD-MM-YYYY")}</td>
                    <td>
                      <Link
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          setOrderId(order.id);
                          setOrderItemModal(true);
                        }}
                      >
                        <i className="bi bi-box-seam"></i> Detail
                      </Link>
                    </td>
                    <td>฿ {order.subTotal}</td>
                    <td>฿ {order.shippingPrice}</td>
                    <td>฿ {order.total}</td>
                    <td className="text-center icon-status">
                      {order.paymentStatus ? (
                        <img src={"/check.png"} alt="check_image" />
                      ) : (
                        <img src={"/wrong.png"} alt="wrong_image" />
                      )}
                    </td>
                    <td className="text-center icon-status">
                      {order.shippingStatus ? (
                        <img src={"/check.png"} alt="check_image" />
                      ) : (
                        <img src={"/wrong.png"} alt="wrong_image" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {!orders.length && <h1 className="my-5 text-center">EMPTY.</h1>}
          </motion.div>
        )}
      </div>

      {orderId && (
        <OrderItemModal
          show={orderItemModal}
          orderid={orderId}
          onHide={() => setOrderItemModal(false)}
        />
      )}
    </LayoutContent>
  );
}
