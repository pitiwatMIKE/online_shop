import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../reducers/products/cartSlice";

export default function MyOrderPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  return <div>MyOrderPage</div>;
}
