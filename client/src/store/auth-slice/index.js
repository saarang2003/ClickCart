import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    isAuthenticated: false,
    isLoading : false,
    user : null,
};


export const registerUser = createAsyncThunk(
    "/auth/register",
  
    async (formData) => {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          withCredentials: true,
        }
      );
  
      return response.data;
    }
  );



  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers :{
        setUser : (state , action) =>{},
    } , 
    extraReducers : (builder) =>{
        builder
        .addCase(registerUser.pending , (state) =>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
    }
})


export default authSlice.reducer;