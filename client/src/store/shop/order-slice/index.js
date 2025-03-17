


import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


const initialState = {
    approvalUrl : null,
    isLoading : null,
    order : null,
    orderList :[],
    orderDetails : null
}


export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData) => {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/create",
        orderData
      );
  
      return response.data;
    }
  );




  export const capturePayment = createAsyncThunk(
    "/order/createNewOrder",
    async ({paymentId , payerId , orderId}) => {
      const response = await axios.post(
        "http://localhost:5000/api/shop/order/capture",
        {paymentId , payerId , orderId}
      );
  
      return response.data;
    }
  );


  export const getAllOrderByUserId = createAsyncThunk(
    "/order/createNewOrder",
    async (userId) => {
      const response = await axios.get(
        "http://localhost:5000/api/shop/order/capture",
      );
  
      return response.data;
    }
  );



  export const getOrderDetails = createAsyncThunk(
    "/order/createNewOrder",
    async (id) => {
      const response = await axios.get(
        "http://localhost:5000/api/shop/order/capture",
     
      );
  
      return response.data;
    }
  );


const ShoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {},
    extraReducers  : (builder) =>{
        builder
        .addCase(createNewOrder.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createNewOrder.fulfilled, (state, action) => {
          state.isLoading = false;
          state.approvalURL = action.payload.approvalURL;
          state.orderId = action.payload.orderId;
          sessionStorage.setItem(
            "currentOrderId",
            JSON.stringify(action.payload.orderId)
          );
        })
        .addCase(createNewOrder.rejected, (state) => {
          state.isLoading = false;
          state.approvalURL = null;
          state.orderId = null;
        }) .addCase(getAllOrderByUserId.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAllOrderByUserId.fulfilled, (state , action) => {
          state.isLoading = false;
          state.orderList = action.payload.data
        })
        .addCase(getAllOrderByUserId.reject, (state) => {
          state.isLoading = false;
          state.orderList =[];
        }).addCase(getOrderDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getOrderDetails.fulfilled, (state , action) => {
          state.isLoading = false;
          state.orderDetails = action.payload.data
        })
        .addCase(getOrderDetails.reject, (state) => {
          state.isLoading = false;
          state.orderDetails = null;
        })
    }
})

export default ShoppingOrderSlice;