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

const combinedReducer = combineReducers({
  cart: cartReducer,
  address: addressReducer,
  myAccount: myAccountReducer,
  product: productReducer,
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});
