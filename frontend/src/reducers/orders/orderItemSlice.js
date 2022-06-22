import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../users/authSlice";

const initialState = {
  loading: false,
  error: false,
  errMessage: false,
  values: [],
};

const orderItemSlice = createSlice({
  name: "orderItem",
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

const { loading, error, success } = orderItemSlice.actions;

export const getOrderItems = (orderId, userId='') => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    const response = await axios.get(
      `/api/orders/order_items?orderId=${orderId}&userId=${userId}`,
      config
    );
    dispatch(success(response.data));
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const selectorOrderItem = (state) => state.orderItem;

export default orderItemSlice.reducer;
