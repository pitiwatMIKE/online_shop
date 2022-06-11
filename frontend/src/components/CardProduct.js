import React from "react";
import { useNavigate } from "react-router-dom";

export default function CardProduct({ id }) {
  let clickSelectOp = false;
  const navigate = useNavigate();
  return (
    <div className="card-product">
      <div
        className="image-card"
        onClick={() => !clickSelectOp && navigate(`/product/${id}`)}
      >
        <img src="http://placehold.jp/354x354.png" alt="nice" />
        <div
          className="select-option"
          onClick={() => {
            clickSelectOp = true;
            navigate(`/about`);
          }}
        >
          SELECT OPTION
        </div>
      </div>

      <div className="detail">
        <div className="name-product">
          <h4>Embroidered Lunar New Year Boba Hoodie</h4>
        </div>
        <div className="price-product">$39.00</div>
      </div>
    </div>
  );
}
