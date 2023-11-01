import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

export const store = configureStore({
    reducer: {
        // counter: counterReducer,
        home: homeSlice,
    },
}); 

