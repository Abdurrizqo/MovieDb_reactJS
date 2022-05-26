import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice";
import authSlice from "./authSlice";

export default configureStore({
  reducer: {
    movies: moviesSlice,
    auth: authSlice,
  },
});
