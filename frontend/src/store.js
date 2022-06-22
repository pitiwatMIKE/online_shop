import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "./reducers/users/authSlice";
import productReducer from "./reducers/products/productSlice";
import myAccountReducer from "./reducers/users/myAccountSlice";
import addressReducer from "./reducers/users/addressSlice";
import cartReducer from "./reducers/products/cartSlice";
import orderReducer from "./reducers/orders/orderSlice";
import orderItemReducer from "./reducers/orders/orderItemSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  myAccount: myAccountReducer,
  address: addressReducer,
  cart: cartReducer,
  order: orderReducer,
  orderItem: orderItemReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    // Excluding Reducers From Being Reset
    let { cart } = state;
    state = { cart };

    // reset all
    // state = undefined
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});
