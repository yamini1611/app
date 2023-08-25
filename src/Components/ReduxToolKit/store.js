import { combineReducers, configureStore, createStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import { arrayReducer } from "./counterSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' ;
import { counterSlice2 } from "./counterSlice";


const persistConfig = {
    key:'root',
    storage:AsyncStorage
}
const persistedReducer = persistReducer(persistConfig,counterSlice2)


const rootReducer = combineReducers({
    counter:counterSlice,
    details:persistedReducer,
    array:arrayReducer,
})


export const store = createStore(rootReducer)
export const persistor = persistStore(store);


export default store;


