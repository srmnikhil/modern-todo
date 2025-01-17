import { createSlice } from "@reduxjs/toolkit";

// Initial state for sidebar
const initialState = {
  isMenuOpen: window.innerWidth >= 1024,  // Sidebar visibility state
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;  // Toggle menu state
    },
  },
});

// Export actions and reducer
export const { toggleMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
