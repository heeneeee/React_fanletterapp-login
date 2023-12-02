import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // loginCheck: false,
  isLogin: !!localStorage.getItem("accessToken"),
  // isLogin: false,
  userId: localStorage.getItem("userId"),
  avatar: localStorage.getItem("avatar"),
  nickname: localStorage.getItem("nickname"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, userId, avatar, nickname } = action.payload;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userId);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("nickname", nickname);
      state.avatar = avatar;
      state.userId = userId;
      state.isLogin = true;
      state.nickname = nickname;
    },
    logout: (state) => {
      localStorage.clear();
      return { ...state, isLogin: false };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
