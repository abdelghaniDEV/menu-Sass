import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const fetchMenu = createAsyncThunk("menuSlice/fetchMenu", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/menus/my-menus`, {
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

const menuSlice = createSlice({
    initialState : [],
    name : "menuSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchMenu.fulfilled , (state , action) => {
          
            return state = action.payload.data.menu
        })
    }
})

const {} = menuSlice.actions
export default menuSlice.reducer