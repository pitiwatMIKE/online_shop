import React from "react";
import { Carousel } from "react-bootstrap";

export default function Carousels() {
  return (
    <Carousel>

      <Carousel.Item>
        <img
          className="d-block"
          src={process.env.PUBLIC_URL + '/cover2.jpg'}
          // src="http://placehold.jp/1200x700.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}
