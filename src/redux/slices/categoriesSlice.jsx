import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const fetchCategories = createAsyncThunk("categoriesSlice/fetchCategories", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
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

const categoriesSlice = createSlice({
    initialState : [],
    name : "categoriesSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchCategories.fulfilled , (state , action) => {
            return state = action.payload.data.categories
        })
    }
})

const {} = categoriesSlice.actions
export default categoriesSlice.reducer