import  { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index';
import adminProductSlice from './admin/product-slice/index';


const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProductSlice : adminProductSlice,
    }
})

export default store;