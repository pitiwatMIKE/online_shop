import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  values: JSON.parse(localStorage.getItem("userAuth")) || null,
  errMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading: (state) => {
      return { ...initialState, loading: true };
    },
    success: (state, action) => {
      return { ...initialState, values: action.payload };
    },
    error: (state, action) => {
      return {
        ...initialState,
        error: true,
        errMessage: action.payload,
      };
    },
    logout: (state) => {
      localStorage.removeItem("userAuth");
      return { ...initialState };
    },
  },
});

const { loading, error, success } = authSlice.actions;
export const { logout } = authSlice.actions;

export const login = (data) => async (dispatch) => {
  localStorage.removeItem("userAuth");
  dispatch(loading());

  try {
    const response = await axios.post(`/api/users/login`, data);
    localStorage.setItem("userAuth", JSON.stringify(response.data));
    dispatch(success(JSON.parse(localStorage.getItem("userAuth"))));
  } catch (e) {
    dispatch(error(e.response.data.message));
  }
};

export const register = (data, navigate) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await axios.post(`/api/users/register`, data);
    localStorage.setItem("userAuth", JSON.stringify(response.data));
    dispatch(success(JSON.parse(localStorage.getItem("userAuth"))));
    navigate("/");
  } catch (e) {
    dispatch(error(e.reponse.data.message));
  }
};

export const notLogin = (cbNavigate) => (dispatch) => {
  let userAuth = JSON.parse(localStorage.getItem("userAuth"));
  if (!userAuth) {
    try {
      throw new Error("Error not Login");
    } catch (e) {
      dispatch(logout());
      cbNavigate();
    }
  }
};

export const selectorAuth = (state) => state.auth;
export default authSlice.reducer;
