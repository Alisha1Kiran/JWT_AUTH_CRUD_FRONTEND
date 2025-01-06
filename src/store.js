import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/userSlice";
import AuthReducer from "./slice/authSlice";
import ProductReducer from "./slice/productSlice"

const store = configureStore({
    reducer: {
        User: UserReducer,
        Auth: AuthReducer,
        Product: ProductReducer,
    }
});

export default store;