import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <div className="spinner-loading">
        <Spinner animation="border" variant="dark" />
      </div>
    </>
  );
}
