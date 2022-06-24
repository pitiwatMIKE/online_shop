import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SearchModal(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/shop/search/${search}/page/1`);
    }
  };

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Search Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="input-search">
            <input
              type="text"
              autoFocus
              placeholder="Search Product"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
