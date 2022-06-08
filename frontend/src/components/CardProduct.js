import React from "react";

export default function CardProduct() {
  return (
    <div className="card-product">
      <div className="image-card">
        <img src="http://placehold.jp/354x354.png" alt="nice" />
        <div className="select-option">SELECT OPTION</div>
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
