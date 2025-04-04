import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    approvalURL: null,
    orderId: null,
    isLoading: false,
    error: null,
    orderList: [],
    orderDetails: null
};

export const createNewOrder = createAsyncThunk(
    "/order/createNewOrder",
    async (orderData, { rejectWithValue }) => {
        try {
            console.log("orderData slcie " ,orderData)
            const response = await axios.post(
                `http://localhost:5000/api/shop/order/create`,
                orderData
            );
            
            console.log("Order creation response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Order creation error:", error);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const capturePayment = createAsyncThunk(
    "/order/capturePayment",
    async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/shop/order/capture`,
                {
                    paymentId,
                    payerId,
                    orderId,
                }
            );
            
            return response.data;
        } catch (error) {
            console.error("Payment capture error:", error);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const getAllOrdersByUserId = createAsyncThunk(
    "/order/getAllOrdersByUserId",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/shop/order/list/${userId}`
            );
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const getOrderDetails = createAsyncThunk(
    "/order/getOrderDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/shop/order/details/${id}`
            );
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

const shoppingOrderSlice = createSlice({
    name: "shoppingOrderSlice",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null;
        },
        clearPaymentData: (state) => {
            state.approvalURL = null;
            state.orderId = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create New Order
            .addCase(createNewOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
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
            .addCase(createNewOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.approvalURL = null;
                state.orderId = null;
                state.error = action.payload?.message || "Failed to create order";
            })
            
            // Capture Payment
            .addCase(capturePayment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(capturePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                // Clear payment data after successful capture
                state.approvalURL = null;
                state.orderId = null;
            })
            .addCase(capturePayment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || "Failed to capture payment";
            })
            
            // Get Orders List
            .addCase(getAllOrdersByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderList = action.payload.data;
            })
            .addCase(getAllOrdersByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.orderList = [];
                state.error = action.payload?.message || "Failed to fetch orders";
            })
            
            // Get Order Details
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orderDetails = action.payload.data;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.orderDetails = null;
                state.error = action.payload?.message || "Failed to fetch order details";
            });
    },
});

export const { resetOrderDetails, clearPaymentData } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;