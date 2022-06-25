import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAddress from "../components/FormAddress";
import FormUser from "../components/FormUser";
import LayoutContent from "../components/LayoutContent";
import { logout, selectorAuth } from "../reducers/users/authSlice";
import { motion } from "framer-motion";

export default function PersonalPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values: userAuth } = useSelector(selectorAuth);
  useEffect(() => {
    if (!userAuth) {
      dispatch(logout());
      navigate("/signin");
    }
  }, [dispatch, navigate, userAuth]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <LayoutContent>
        <FormUser />
        <FormAddress />
      </LayoutContent>
    </motion.div>
  );
}
