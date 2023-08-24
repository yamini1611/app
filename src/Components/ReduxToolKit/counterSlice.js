import { combineReducers, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        bookings: 0,
        movieCategory:""
    },
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        setBookings: (state, action) => {
            state.bookings = action.payload;
        },
        setMovieCategory:(state,action)=>{
            state.movieCategory=action.payload;
        }


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




export const { setBookings ,setMovieCategory } = counterSlice.actions;

export const { increment, decrement, reset } = counterSlice.actions;

export const selectBookings = (state) => state.counter.bookings;


export default counterSlice.reducer;