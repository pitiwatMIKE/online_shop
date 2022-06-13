import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  values: null,
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
    setAuthWhenRefresh: (state, action) => {
      return { ...initialState, values: action.payload };
    },
    logout: (state) => {
      localStorage.removeItem("userAuth");
      return { ...initialState };
    },
  },
});

const { loading, error, success } = authSlice.actions;
export const { logout, setAuthWhenRefresh } = authSlice.actions;

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

export const selectorAuth = (state) => state.auth;
export default authSlice.reducer;
