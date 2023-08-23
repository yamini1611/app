import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import { arrayReducer } from "./counterSlice";

const rootReducer = combineReducers({
    counter:counterSlice,
    array:arrayReducer
})

const store = createStore(rootReducer);

export default store;


