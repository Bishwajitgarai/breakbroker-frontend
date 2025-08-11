import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserLocationState = {
  city_id: string | null;
  city_name: string | null;
  state_name: string | null;
  state_id: string | null;
  district_id: string | null;
  lat: number | null;
  long: number | null;
};

const initialState: UserLocationState = {
  city_id: null,
  city_name: null,
  state_name: null,
  state_id: null,
  district_id: null,
  lat: null,
  long: null,
};

type LocationPayload = {
  city_id: string;
  city_name: string;
  state_name: string;
  state_id: string;
  district_id: string;
  lat: number;
  long: number;
};

const userLocationSlice = createSlice({
  name: "userLocation",
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<LocationPayload>) {
      state.city_id = action.payload.city_id;
      state.city_name = action.payload.city_name;
      state.state_name = action.payload.state_name;
      state.state_id = action.payload.state_id;
      state.district_id = action.payload.district_id;
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
    clearLocation(state) {
      state.city_id = null;
      state.city_name = null;
      state.state_name = null;
      state.state_id = null;
      state.district_id = null;
      state.lat = null;
      state.long = null;
    },
  },
});

export const { setLocation, clearLocation } = userLocationSlice.actions;

export default userLocationSlice.reducer;
