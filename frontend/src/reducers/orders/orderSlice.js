import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../users/authSlice";

const initialState = {
  loading: false,
  error: false,
  errMessage: false,
  values: [],
};

const orderSlice = createSlice({
  name: "order",
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
  },
});

const { loading, error, success } = orderSlice.actions;

export const getOrders = (status) => async (dispatch) => {
  let query = status === undefined ? "" : `?status=${status ? 1 : 0}`;
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },  
  };

  dispatch(loading());
  try {
    const response = await axios.get(`/api/orders${query}`, config);
    dispatch(success(response.data));
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const getOrdersShipping = (status) => async (dispatch) => {
  status = status ? 1 : 0;
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    const response = await axios.get(
      `/api/orders/shipping?status=${status}`,
      config
    );
    dispatch(success(response.data));
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const sendOrder = (id) => async (dispatch, getState) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  let orders = getState().order.values;

  dispatch(loading());
  try {
    await axios.put(
      `/api/orders/update/${id}`,
      { shippingStatus: true },
      config
    );
    orders = orders.filter((order) => order.id !== id);
    dispatch(success(orders));
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const selectorOrder = (state) => state.order;

export default orderSlice.reducer;
