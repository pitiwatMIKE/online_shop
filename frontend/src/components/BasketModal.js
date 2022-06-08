import React from "react";
import { Modal } from "react-bootstrap";

export default function BasketModal(props) {
  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="basket">
          <h1>Basket</h1>
        </div>
      </Modal.Body>
    </Modal>
  );
}
