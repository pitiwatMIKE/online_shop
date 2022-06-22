import React from "react";
import { Modal} from "react-bootstrap";

export default function AddressModal(props) {
  const {
    useraddress: {
      firstName,
      lastName,
      address,
      city,
      province,
      postalCode,
      phone,
      email,
    },
  } = props;

  return (
    <Modal {...props} className="cart-modal" scrollable size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>User Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="addreess-modal-contanier">
          <div className="filed">
            <label>Full Name:</label>
            <span>{`${firstName} ${lastName}`}</span>
          </div>
          <div className="filed">
            <label>Email:</label>
            <span>{`${email}`}</span>
          </div>
          <div className="filed">
            <label>Postal Code:</label>
            <span>{`${postalCode}`}</span>
          </div>
          <div className="filed">
            <label>Phone:</label>
            <span>{`${phone}`}</span>
          </div>
          <div className="filed">
            <label>Address:</label>
            <span>{`${address}, city: ${city}, province: ${province}.`}</span>
          </div>
        </div>
          
      </Modal.Body>
    </Modal>
  );
}
