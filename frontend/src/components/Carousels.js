import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Carousels() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
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
    </motion.div>
  );
}
