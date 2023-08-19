import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import { ticketsSlice } from "./counterSlice";

const store = configureStore({
    reducer:{
        counter:counterSlice,
       
    }
})

export default store;