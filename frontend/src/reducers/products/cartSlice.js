import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [],
  total: 0,
};

const calTotal = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let result = 0;
  cart.forEach((product) => {
    result += Number(product.qty) * Number(product.price);
  });
  return result;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCard: (state) => {
      state.values = JSON.parse(localStorage.getItem("cart"));
      state.total = calTotal();
    },
    setCart: (state, action) => {
      const { id } = action.payload;
      // remove product when duplicate
      let cart = state.values.filter((item) => item.id !== id);
      cart.push(action.payload);
      state.values = cart;
      localStorage.setItem("cart", JSON.stringify(state.values));
      state.total = calTotal();
    },
    deleteCard: (state, action) => {
      state.values = state.values.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.values));
      state.total = calTotal();
    },
    changeQty: (state, action) => {
      let { id, qty } = action.payload;
      let index = state.values.map((item) => item.id).indexOf(id);

      // check value <= 0
      let Isnum = /^\d+$/;
      qty = Isnum.test(qty) || qty === "" ? qty : 1;
      qty = qty === "0" ? 1 : qty;

      state.values[index].qty = qty;
      localStorage.setItem("cart", JSON.stringify(state.values));
      state.total = calTotal();
    },
  },
});

export const { getCard, setCart, deleteCard, changeQty } = cartSlice.actions;
export const selectorCart = (state) => state.cart;
export default cartSlice.reducer;
