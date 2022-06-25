import React from "react";
import { Carousel } from "react-bootstrap";

export default function Carousels() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block"
          src={process.env.PUBLIC_URL + "/cover1.jpg"}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block"
          src={process.env.PUBLIC_URL + "/cover2.jpg"}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block"
          src={process.env.PUBLIC_URL + "/cover3.jpg"}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
