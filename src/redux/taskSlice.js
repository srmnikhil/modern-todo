import { createSlice } from "@reduxjs/toolkit";

// Load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState = {
  tasks: loadTasksFromLocalStorage(), // Load tasks from localStorage on initial load
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      // Sync with localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      // Sync with localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = updatedTasks;
      // Sync with localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleTaskCompletion: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      state.tasks = updatedTasks;
      // Sync with localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleStar: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, isStarred: !task.isStarred } : task
      );
      state.tasks = updatedTasks;
      // Sync with localStorage
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, removeTask, toggleTaskCompletion, toggleStar } = tasksSlice.actions;

export default tasksSlice.reducer;
