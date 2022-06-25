import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadTable() {
  return (
    <div className="load-table">
      <Spinner animation="border" variant="dark" />
    </div>
  );
}
