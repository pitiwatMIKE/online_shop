import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduct({ id, product }) {
  let clickSelectOp = false;
  const navigate = useNavigate();
  return (
    <div className="card-product">
      <div
        className="image-card"
        onClick={() => !clickSelectOp && navigate(`/product/${id}`)}
      >
        <img src={product.imageUrl} alt="nice" />
        <div
          className="select-option"
          onClick={() => {
            clickSelectOp = true;
          }}
        >
          SELECT OPTION
        </div>
      </div>

      <div className="detail">
        <div className="name-product">
          <h4>{product.name}</h4>
        </div>
        <div className="price-product">฿{product.price}</div>
      </div>
    </div>
  );
}
