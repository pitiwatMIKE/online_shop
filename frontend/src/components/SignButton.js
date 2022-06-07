import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";

export default function SignButton({ closeSide }) {
  const [dropdown, setDropdown] = useState(false);
  const closeDropdown = () => {
    setDropdown(false);
    if (closeSide) {
      closeSide();
    }
  };
  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  const isLogin = true;

  return (
    <>
      {!isLogin ? (
        <Link to="" className="sign-button">
          SignIn
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
            <ul>
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
            </ul>
          )}
        </div>
      )}
    </>
  );
}
