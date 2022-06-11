import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { motion } from "framer-motion";

export default function SignButton({ closeSide }) {
  const [dropdown, setDropdown] = useState(false);
  const closeDropdown = () => {
    setDropdown(false);
    if (closeSide) {
      closeSide();
    }
  };
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  const isLogin = false;

  return (
    <>
      {!isLogin ? (
        <Link to="/signin" className="sign-button">
          Sign In
        </Link>
      ) : (
        <div className="sign-dropdown" ref={dropdown ? ref : null}>
          <Link
            to=""
            className="btn-sign-dropdown"
            onClick={(e) => {
              e.preventDefault();
              setDropdown(!dropdown);
            }}
          >
            <i className="bi bi-person"></i>
          </Link>
          {dropdown && (
            <motion.ul animate={{ width: 200 }}>
              <li>Name: Pitiwat</li>
              <li>
                <Link to="/about" onClick={closeDropdown}>
                  MyProfile
                </Link>
              </li>
              <li>
                <Link to="/" onClick={closeDropdown}>
                  SignOut
                </Link>
              </li>
            </motion.ul>
          )}
        </div>
      )}
    </>
  );
}
