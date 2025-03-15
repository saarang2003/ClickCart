import  { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index';
import adminProductSlice from './admin/product-slice/index';

import shopProductsSlice from "../store/shop/product-slice/index";
import shopCartSlice from '../store/shop/cart-slice/index'
import shopAddressSlice from '../store/shop/address-slice/index';
import shopOrderSlice from '../store/shop/order-slice/index'


const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductSlice,

        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopAddressSlice 
    }
})

export default store;