import React from "react";
import { Modal } from "react-bootstrap";

export default function SearchModal(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Search Now !!!");
  };

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="input-search">
            <input type="text" autoFocus placeholder="Search Product" />
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
