import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewMode: "card",  // "card" or "list"
};

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === "card" ? "list" : "card";  // Toggle between card and list
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;  // Set the view mode directly if needed
    },
  },
});

export const { toggleViewMode, setViewMode } = viewModeSlice.actions;

export default viewModeSlice.reducer;
