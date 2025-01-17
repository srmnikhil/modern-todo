import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";
import tasksReducer from "./taskSlice";
import viewModeReducer from "./viewModeSlice";
import taskEditSidebarReducer from "./taskEditSidebarSlice";
import weatherReducer from './weatherSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    tasks: tasksReducer,
    viewMode: viewModeReducer,
    taskEditSidebar: taskEditSidebarReducer,
    weather: weatherReducer,
  },
});

export default store;
