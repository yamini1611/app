//This is the redux toolkit function which will give the functionality of the decrement and the increment for the count

import { combineReducers, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name:"counter",
    initialState:0,
    reducers:{
        increment : (state)=>state + 1,
        decrement : (state)=>state - 1
        
    },
    extraReducers:{

    }
})

export const ticketsSlice = createSlice({
    name:"Tickets",
    initialState:[],
    reducers:{
        addTicket:(state)=>state.push(state)
    }
})

export const {increment , decrement} = counterSlice.actions;
export const {addTicket} = ticketsSlice.actions;


export default counterSlice.reducer;