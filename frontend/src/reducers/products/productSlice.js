import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  errMessage: null,
  values: [],
};

const productSlice = createSlice({
  name: "product",
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

const { loading, error, success } = productSlice.actions;

export const getProducts = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axios.get("/api/products");
    dispatch(success(response.data));
  } catch (e) {
    dispatch(error(e.response.data.message));
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axios.get(`/api/products/${id}`);
    dispatch(success(response.data));
  } catch (e) {
    dispatch(error(e.response.data.message));
  }
};

export const getProductLatest = (amount) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axios.get(`/api/products/latest?amount=${amount}`);
    dispatch(success(response.data));
  } catch (e) {
    dispatch(error(e.response.data.message));
  }
};

export const selectorProduct = (state) => state.product;

export default productSlice.reducer;
