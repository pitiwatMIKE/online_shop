import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectorAuth } from "../reducers/users/authSlice";

export default function SignButton({ closeSide }) {
  const [isLogin, setIsLogin] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const closeDropdown = () => {
    setDropdown(false);
    if (closeSide) {
      closeSide();
    }
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signoutHandle = (e) => {
    e.preventDefault();
    closeDropdown();
    dispatch(logout());
    navigate("/signin");
    setIsLogin(false);
  };

  const { values: userAuth } = useSelector(selectorAuth);

  useEffect(() => {
    if (userAuth) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      dispatch(logout());
    }
  }, [dispatch, userAuth]);

  return (
    <>
      {!isLogin ? (
        <Link to="/signin" className="sign-button" onClick={closeSide}>
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
              <li>{userAuth.email}</li>
              <li>
                <Link to="/personal" onClick={closeDropdown}>
                  Personal
                </Link>
              </li>
              <li>
                <Link to="/" onClick={signoutHandle}>
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
