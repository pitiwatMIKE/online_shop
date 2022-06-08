import React from "react";
import { Container } from "react-bootstrap";

export default function LayoutContent({ children }) {
  return (
    <>
      <Container className="wrap-content">{children}</Container>
    </>
  );
}
