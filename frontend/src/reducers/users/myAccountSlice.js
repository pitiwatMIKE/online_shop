import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const initialState = {
  loading: false,
  error: false,
  errMessage: null,
  valuse: null,
};

const myAccountSlice = createSlice({
  name: "myAccount",
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
        error: true,
        errMessage: action.payload,
      };
    },
  },
});

const { loading, success, error } = myAccountSlice.actions;

export const getMyAccount = () => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    const response = await axios.get(`/api/users/my_account`, config);
    dispatch(success(response.data));
  } catch (e) {
    console.log(e.response.data.message);
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const updateMyAccount = (data, cb) => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    const response = await axios.put(
      `/api/users/my_account/update`,
      data,
      config
    );
    dispatch(success(response.data));
    cb();
  } catch (e) {
    console.log(e.response.data.message);
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const selectorMyAccount = (state) => state.myAccount;
export default myAccountSlice.reducer;
