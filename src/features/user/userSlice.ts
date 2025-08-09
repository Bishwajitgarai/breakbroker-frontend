import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  access_token: string | null;
  refresh_token: string | null;
  token_type: string | null;
  isLoggedIn: boolean;
};

const getInitialState = (): UserState => {
  if (typeof window === "undefined") {
    return {
      access_token: null,
      refresh_token: null,
      token_type: null,
      isLoggedIn: false,
    };
  }
  return {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
    token_type: localStorage.getItem("token_type"),
    isLoggedIn: !!localStorage.getItem("access_token"),
  };
};

const initialState: UserState = getInitialState();

type LoginTokens = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

type RefreshTokens = {
  access_token: string;
  token_type: string;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginTokens>) {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.token_type = action.payload.token_type;
      state.isLoggedIn = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("refresh_token", action.payload.refresh_token);
        localStorage.setItem("token_type", action.payload.token_type);
      }
    },
    refreshToken(state, action: PayloadAction<RefreshTokens>) {
      state.access_token = action.payload.access_token;
      state.token_type = action.payload.token_type;

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("token_type", action.payload.token_type);
      }
    },
    logout(state) {
      state.access_token = null;
      state.refresh_token = null;
      state.token_type = null;
      state.isLoggedIn = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_type");
      }
    },
  },
});

export const { login, refreshToken, logout } = userSlice.actions;

export default userSlice.reducer;
