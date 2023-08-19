//This is the redux toolkit function which will give the functionality of the decrement and the increment for the count

import { combineReducers, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1,
        reset: (state) => state = 0

    }
})



export const arrayReducer = (state = [], action) => {
    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'pop':
            return [...state.filter((item) => item !== action.payload)];
        case 'reset':
            return [action.payload];
        default:
            return state;
    }
}





export const { increment, decrement, reset } = counterSlice.actions;



export default counterSlice.reducer;