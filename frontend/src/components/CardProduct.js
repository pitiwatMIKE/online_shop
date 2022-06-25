import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../reducers/products/cartSlice";
import CartModal from "./CartModal";
import { motion } from "framer-motion";

export default function CardProduct({ id, product }) {
  let clickSelectOp = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartModalShow, setCartModalModalShow] = useState(false);

  return (
    <motion.div
      className="card-product"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y:0 }}
      transition={{ duration: 0.9 }}
    >
      <div
        className="image-card"
        onClick={() => !clickSelectOp && navigate(`/product/${id}`)}
      >
        <img src={product.imageProduct} alt="product" />
        <div
          className="select-option"
          onClick={() => {
            clickSelectOp = true;
            dispatch(setCart({ ...product, qty: 1 }));
            setCartModalModalShow(true);
          }}
        >
          SELECT OPTION
        </div>
      </div>

      <div className="detail">
        <div className="name-product">
          <h4>{product.name?.toUpperCase()}</h4>
        </div>
        <div className="price-product">฿{product.price}</div>
      </div>

      <CartModal
        show={cartModalShow}
        onHide={() => setCartModalModalShow(false)}
      />
    </motion.div>
  );
}
