import  { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index';
import adminProductSlice from './admin/product-slice/index';

import shopProductsSlice from "../store/shop/product-slice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductSlice,

        shopProducts : shopProductsSlice,
    }
})

export default store;