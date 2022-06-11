import React from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  return (
    <>

        <div className="product-container">
          <div className="show-product">
            <img
              src={process.env.PUBLIC_URL + "/test_product.jpg"}
              alt="product_image"
            />
          </div>
          <div className="product-detail">
            <h3>PRODUCT NAME {id}</h3>
            <div className="product-price">100 ฿</div>
            <p className="product-description">
              Sed cum necessitatibus ad. Sunt architecto ad repellendus nihil
              unde dicta sit expedita. Velit rerum dolore incidunt debitis
              sapiente laborum expedita porro odit.
            </p>
            <div className="add-product">
              <div>
                <input type="number" min="1" max="99" />
              </div>
              <div>
                <button>Add To Card</button>
              </div>
              <div className="buy-now">
                <button>Buy Now</button>
              </div>
            </div>
          </div>
        </div>

    </>
  );
}
