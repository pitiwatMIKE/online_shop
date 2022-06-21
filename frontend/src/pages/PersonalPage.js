import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAddress from "../components/FormAddress";
import FormUser from "../components/FormUser";
import LayoutContent from "../components/LayoutContent";
import { logout, selectorAuth } from "../reducers/users/authSlice";

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
    <>
      <LayoutContent>
        <FormUser />
        <FormAddress />
      </LayoutContent>
    </>
  );
}
