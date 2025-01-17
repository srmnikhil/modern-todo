import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false, // Default state for sidebar visibility
  taskId: null,         // Keep track of the task ID currently being edited
};

const taskEditSidebarSlice = createSlice({
  name: "taskEditSidebar",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isSidebarOpen = true;
      state.taskId = action.payload; // Set the task ID being edited
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
      state.taskId = null; // Clear the task ID
    },
  },
});

// Export actions and reducer
export const { openSidebar, closeSidebar } = taskEditSidebarSlice.actions;
export default taskEditSidebarSlice.reducer;
