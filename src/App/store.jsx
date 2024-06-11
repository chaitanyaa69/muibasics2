import {configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../Features/UserSlice"

const persistConfig ={
    //type : REGISTER,
    key : "root",
    version : 1,
    storage
};

const reducer =combineReducers({
    user : userReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)


export default configureStore({
    reducer : persistedReducer
})