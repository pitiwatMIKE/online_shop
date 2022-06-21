import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

let OmiseCard;

export default function Payment({
  placeOrderHandle,
  setPaymentFailed,
  cart,
  subTotal,
  shippingPrice,
  total,
}) {
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();

  // add script && configure omise
  useEffect(() => {
    const addScript = () => {
      let script = document.createElement("script");
      script.src = "https://cdn.omise.co/omise.js";
      script.async = true;
      script.onload = () => {
        OmiseCard = window.OmiseCard;
        OmiseCard.configure({
          publicKey: "pkey_test_5s1jxn491lo584wn7ld",
          currency: "THB",
          frameLabel: "Online Shop",
          submitLabel: "Pay Now",
          buttonLabel: "Pay with Omise",
        });
      };

      window.script_omise = script;
      document.body.appendChild(window.script_omise);
    };

    if (!window.OmiseCard) {
      addScript();
    }
  }, []);

  const saveOrder = (config) => {
    const orderItems = cart.map((product) => ({
      id: product.id,
      qty: product.qty,
    }));

    const data = {
      orderItems,
      subTotal,
      shippingPrice,
      total,
      paymentStatus: true,
      paymentDate: Date.now(),
      shippingStatus: false,
      shippingDate: null,
    };

    axios
      .post(`/api/orders/create`, data, config)
      .then(() => {
        setPaymentLoading(false);
        setPaymentFailed(false);
        navigate("/myorder", { replace: true });
      })
      .catch(() => {
        setPaymentLoading(false);
        setPaymentFailed(true);
      });
  };

  const omiseCardHandler = () => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    const config = {
      headers: {
        Authorization: "Bearer " + userAuth?.token,
        "Content-Type": "application/json",
      },
    };

    OmiseCard.open({
      amount: Number(total) * 100,
      onCreateTokenSuccess: (token) => {
        setPaymentLoading(true);
        axios
          .post(
            `/api/orders/payment`,
            {
              email: userAuth.email,
              amount: Number(total) * 100,
              token: token,
            },
            config
          )
          .then((res) => {
            if (res.data.status === "successful") {
              saveOrder(config);
            }
            if (res.data.status === "failed") {
              setPaymentLoading(false);
              setPaymentFailed(true);
            }
          })
          .catch(() => {
            setPaymentLoading(false);
            setPaymentFailed(true);
          });
      },
      onFormClosed: () => {},
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentFailed(false);
    if (!placeOrderHandle()) {
      omiseCardHandler();
    }
  };

  return (
    <form>
      <button
        id="credit-card"
        onClick={handlePayment}
        disabled={paymentLoading}
      >
        {paymentLoading && (
          <Spinner className="me-3" animation="border" variant="light" />
        )}
        PLACE ORDER
      </button>
    </form>
  );
}
