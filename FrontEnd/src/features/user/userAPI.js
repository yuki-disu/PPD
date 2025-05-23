import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (Credentials, thunkAPI, rejectWithValue) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        Credentials
      );
      console.log(response);
      return response.data; // Return the response data to be used in `fulfilled`
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);
export const signUpUser = createAsyncThunk(
  "user/signup",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup", // Correct URL as per the documentation
        userData
      );
      return res.data; // Return the response data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message); // Handle error
    }
  }
);

export const UpdatePassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password, newPassword, confirmNewPassword }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
        {
          password,
          newPassword,
          confirmNewPassword,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const UpdateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async ({ name, email, phoneNumber }, thunkAPI) => {
    try {
      const response = await axios.patch(
        "http://127.0.0.1:3000/api/v1/users/updateMe ",
        {
          name,
          email,
          phoneNumber,
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
