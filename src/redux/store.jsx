import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./slices/menuSlice";
import RestuarantSlice from "./slices/restuarantSlice"
import categoriesSlice from "./slices/categoriesSlice";
import profileSlice from "./slices/profileSlice"

export const store = configureStore({
    reducer: {
        menu : menuSlice,
        restuarant : RestuarantSlice,
        categories : categoriesSlice,
        profile : profileSlice
    }, // Add your reducers here
})