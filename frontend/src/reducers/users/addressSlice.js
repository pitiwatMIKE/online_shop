import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const initialState = {
  loading: false,
  error: false,
  errMessage: null,
  values: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    loading: (state) => {
      return { ...state, loading: true, error: false, errMessage: null };
    },
    success: (state, action) => {
      return { ...state, loading: false, error: false, values: action.payload };
    },
    error: (state, action) => {
      return {
        ...state,
        loading: false,
        error: false,
        errMessage: action.payload,
      };
    },
  },
});

const { loading, error, success } = addressSlice.actions;

export const getAddress = () => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    const response = await axios.get(`/api/address`, config);
    dispatch(success(response.data));
  } catch (e) {
    console.log(e.response.data.message);
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const createAddress = (data, cb) => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    const response = await axios.post(`/api/address`, data, config);
    dispatch(success(response.data));
    cb();
  } catch (e) {
    console.log(e.response.data.message);
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const selectorAddress = (state) => state.address;
export default addressSlice.reducer;
