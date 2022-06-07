import React, { useState } from "react";
import Navbar from "./Navbar";
import SideNav from "./SideNav";

export default function Header() {
  const [sidenav, setSidenav] = useState(false);

  return (
    <>
      <Navbar sidenav={sidenav} setSidenav={setSidenav} />
      <SideNav sidenav={sidenav} setSidenav={setSidenav} />
    </>
  );
}
