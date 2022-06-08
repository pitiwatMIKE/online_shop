import React from "react";
import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-content" style={{ fontSize: 15 }}>
        <Row>
          <Col md={4} lg={4}>
            <div>Frequently Asked Questions</div>
            <div>Refund policy</div>
            <div>Terms of service</div>
          </Col>
          <Col md={4} lg={4}>
            <div style={{ fontSize: 20 }}>FOLLOW US</div>
            <div>
              <span>IG</span> | <span>Facebook</span> | <span>Twitter</span>
            </div>
          </Col>
          <Col md={4} lg={4}>
            <div>About Lorem</div>
            <div>Become a retailer</div>
            <div>Blog</div>
            <div>Contact Us</div>
          </Col>
        </Row>

        <div style={{ fontSize: 10, marginTop: 20 }}>
          <div>© 2022, Lorem</div>
          <div>Powered by Shopify</div>
        </div>
      </div>
    </div>
  );
}
