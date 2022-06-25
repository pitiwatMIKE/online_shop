import axios from "axios";
import React, { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import LayoutContent from "../components/LayoutContent";
import { motion } from "framer-motion";

export default function AboutPage() {
  const [resetLoading, setResetLoading] = useState(false);

  const handleResetDb = async () => {
    setResetLoading(true);
    try {
      const response = await axios.get("/reset/db");
      console.log(response.data);
      setResetLoading(false);
    } catch (e) {
      console.log(e);
      setResetLoading(false);
    }
  };

  return (
    <LayoutContent>
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <div className="resetdb">
          <button onClick={handleResetDb}>
            {resetLoading && <Spinner animation="border" variant="light" />}
            <span>RESET DB</span>
          </button>
        </div>

        <h1 className="">User Role</h1>
        <hr />
        <Table className="about-table" striped bordered responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>uesr@example.com</td>
              <td>123456</td>
              <td>user</td>
            </tr>
            <tr>
              <td>admin@example.com</td>
              <td>123456</td>
              <td>admin</td>
            </tr>
          </tbody>
        </Table>

        <h1 className="mt-4">Card for Payment</h1>
        <hr />
        {/* debit card */}
        <div className="debit-card mb-5">
          <h4 className="card-title">VisaElecton</h4>
          <div className="ship-card"></div>
          <div className="card-number">4111 1111 1111 1111</div>

          <div className="card-mid">
            <div className="exp-date">
              <span>EXP</span> <div>03/33</div>
            </div>
            <div className="card-cvc">
              <span>CVC</span> <div>333</div>
            </div>
          </div>

          <div className="footer-card">
            <div className="card-name">NAN NAN</div>
            <div className="card-type">VISA</div>
          </div>
        </div>
      </motion.div>
    </LayoutContent>
  );
}
