


import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    approvalUrl : null,
    isLoading : null,
    order : null,
}


const ShoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {},
    extraReducers  : (builder) =>{}
})

export default ShoppingOrderSlice;