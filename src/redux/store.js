// import { configureStore } from "@reduxjs/toolkit";
// import accountReducer from "./accountSlide";

// export const store = configureStore({
//   reducer: {
//     account: accountReducer,
//   },
// });
import { configureStore } from '@reduxjs/toolkit'
import accountReducer  from './accountSlice'

export const store = configureStore({
  reducer: {
    account : accountReducer
  },
})