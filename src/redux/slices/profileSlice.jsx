import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";





export const fetchProfile = createAsyncThunk("profileSlice/fetchProfile", async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
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

const profileSlice = createSlice({
    initialState : [],
    name : "profileSlice",
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchProfile.fulfilled , (state , action) => {
            return state = action.payload.data.user
        })
    }
})

const {} = profileSlice.actions
export default profileSlice.reducer