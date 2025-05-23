import { signUpUser, loginUser, UpdatePassword } from "./userAPI";
import { createSlice } from "@reduxjs/toolkit";

const getUserFromToken = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  console.log(user);
  console.log(token);
  if (!user || !token) return null;

  try {
    return {
      user: JSON.parse(user),
      token,
    };
  } catch (error) {
    console.error("Invalid JSON in localStorage 'user':", error);
    return null;
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getUserFromToken(),
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log(state.userInfo);
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.data;
        localStorage.setItem("token", action.payload.token);
        console.log("token in slice", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //sign up
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // <-- Add this
      })

      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //reset password
      .addCase(UpdatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("token", action.payload.token);
        state.message = "password reset successful";
      })
      .addCase(UpdatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout, clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;
