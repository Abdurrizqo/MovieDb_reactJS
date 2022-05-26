import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { editProfile } from "../services/auth";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://notflixtv.herokuapp.com/api/v1/users/login",
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://notflixtv.herokuapp.com/api/v1/users",
        payload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const userEdit = createAsyncThunk("auth/userEdit", async (payload) => {
  try {
    const res = await editProfile(payload);
    return res;
  } catch (error) {
    throw new Error(error?.message ?? "Edit Profile failed");
  }
});

const initialState = {
  user: null,
  loading: false,
  isError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //   HADLE LOGIN
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.user = null;
      state.isError = null;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
      state.isError = null;
      state.loading = false;
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isError = action.payload;
    },

    // HANDLE REGISTER
    [userRegister.pending]: (state) => {
      state.loading = true;
      state.user = null;
      state.isError = null;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isError = null;
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
    },
    [userRegister.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isError = action.payload;
    },

    //HANDLE EDIT PROFILE
    [userEdit.pending]: (state) => {
      state.loading = true;
      state.user = null;
      state.isError = null;
    },
    [userEdit.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isError = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [userEdit.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isError = action.error.message;
    },
  },
});

export default authSlice.reducer;
