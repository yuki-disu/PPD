import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import housesReducer from "./features/houses/houseSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    houses: housesReducer,
  },
});

export default store;
