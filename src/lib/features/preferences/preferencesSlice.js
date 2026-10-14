
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateRange: "7days",
  sidebarOpen: true,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { setDateRange, toggleSidebar } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;