//This is the redux toolkit function which will give the functionality of the decrement and the increment for the count

import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:"counter",
    initialState:0,
    reducers:{
        increment : (state)=>state + 1,
        decrement : (state)=>state - 1
    }
})

export const {increment , decrement} = counterSlice.actions;
export default counterSlice.reducer;