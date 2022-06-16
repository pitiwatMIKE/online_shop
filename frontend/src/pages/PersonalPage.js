import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAddress from "../components/FormAddress";
import FormUser from "../components/FormUser";
import LayoutContent from "../components/LayoutContent";
import { notLogin } from "../reducers/users/authSlice";

export default function PersonalPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notLogin(() => navigate("/signin")));
  }, [dispatch, navigate]);
  return (
    <>
      <LayoutContent>
        <FormUser />
        <FormAddress />
      </LayoutContent>
    </>
  );
}
