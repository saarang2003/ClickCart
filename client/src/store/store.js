import  { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth-slice/index';
import adminProductSlice from './admin/product-slice/index';
import adminOrderSlice from './admin/order-slice/index';

import shopProductsSlice from "../store/shop/product-slice/index";
import shopCartSlice from '../store/shop/cart-slice/index'
import shopAddressSlice from '../store/shop/address-slice/index';
import shopOrderSlice from '../store/shop/order-slice/index'
import shopSearchSlice from '../store/shop/search-slice/index'
import shopReviewSlice from '../store/shop/review-slice/index'

const store = configureStore({
    reducer : {
        auth : authReducer,

        adminProducts : adminProductSlice,
        adminOrder: adminOrderSlice,

        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice ,
        shopSearch : shopSearchSlice,
        shopReview : shopReviewSlice


    }
})

export default store;