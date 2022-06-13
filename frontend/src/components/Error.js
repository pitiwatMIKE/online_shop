import React from "react";
import { Alert } from "react-bootstrap";

export default function Error({ msg }) {
  return (
    <>
      <Alert className="my-2" variant="danger">{msg}</Alert>
    </>
  );
}
