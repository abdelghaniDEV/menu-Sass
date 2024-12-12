import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const fetchRestuarant = createAsyncThunk("RestuarantSlice/fetchRestuarant", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/restaurants/my-restaurant`, {
            headers: {
                Authorization : 'Bearer ' + localStorage.getItem('authToken'),
              },
        });
        
        return response.data; // Return the data directly
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Reject the thunk with error
      }
})

const RestuarantSlice = createSlice({
    initialState : [],
    name : "RestuarantSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchRestuarant.fulfilled , (state , action) => {
            return state = action.payload.data
        })
    }
})

const {} = RestuarantSlice.actions
export default RestuarantSlice.reducer