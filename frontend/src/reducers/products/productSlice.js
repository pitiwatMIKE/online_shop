import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../users/authSlice";

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
      return { ...state, loading: true, error: false };
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

const { loading, error, success } = productSlice.actions;

export const getProducts =
  ({ page, search }) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      const currentPage = page ? `page=${page}` : "";
      const keyword = search ? `search=${search}` : "";
      const response = await axios.get(
        `/api/products?${currentPage}&${keyword}`
      );
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

export const createProduct = (data, navigate) => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
      "Content-Type": "multipart/form-data",
    },
  };

  dispatch(loading());
  try {
    const response = await axios.post(`/api/products/create`, data, config);
    dispatch(success(response.data));
    navigate('/admin/product')
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const updateProduct = (data, id, navigate) => async (dispatch) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
      "Content-Type": "multipart/form-data",
    },
  };

  dispatch(loading());
  try {
    const response = await axios.put(
      `/api/products/update/${id}`,
      data,
      config
    );
    dispatch(success(response.data));
    navigate('/admin/product')
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const config = {
    headers: {
      Authorization: "Bearer " + userAuth?.token,
    },
  };

  dispatch(loading());
  try {
    await axios.delete(`/api/products/delete/${id}`, config);
    let { products, maxPage } = getState().product.values;
    products = products.filter((product) => product.id !== id);
    dispatch(success({ products, maxPage }));
  } catch (e) {
    e.response.status === 401
      ? dispatch(logout())
      : dispatch(error(e.response.data.message));
  }
};

export const selectorProduct = (state) => state.product;

export default productSlice.reducer;
