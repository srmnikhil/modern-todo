import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon, Cancel as CancelIcon, Add as AddIcon, Notifications as NotificationsIcon, Event as EventIcon, Repeat as RepeatIcon } from "@mui/icons-material";
import { removeTask } from "../redux/taskSlice";

const TaskEditSidebar = ({ taskId: propTaskId, onClose }) => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.taskEditSidebar);
  const tasks = useSelector((state) => state.tasks.tasks);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const task = tasks.find((t) => t.id === propTaskId);

  const [repeat, setRepeat] = useState(false); // Placeholder for repeat task

  const handleDeleteTask = () => {
    dispatch(removeTask(propTaskId));
    onClose(); // Close the sidebar after delete
  };

  // Get created date in a human-readable format
  const getCreatedDate = (date) => {
    const now = new Date();
    const taskDate = new Date(date);
    console.log(date)
    const diffInDays = Math.floor((now - taskDate) / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    console.log(taskDate.toLocaleDateString())
    return taskDate.toLocaleDateString();
  };
  if (!isSidebarOpen) return null; // Sidebar is closed

  return (
    <div
      className={`absolute top-16 lg:left-[calc(73vw+3rem)] left-[calc(60vw+2rem)] lg:w-[21vw] w-[30vw] h-full p-4 transition-all duration-300 
        ${isDarkMode ? "bg-darkSideBackground" : "bg-lightSideBackground"} 
        ${propTaskId ? "translate-x-0" : "translate-x-[100%]"}`} // Sidebar visible when taskId is present
    >
      {/* Task Details */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Task Details</h3>
        <IconButton color="error" onClick={onClose}>
          <CancelIcon />
        </IconButton>
      </div>
      <div className="mt-4">
        <p><strong>Task: </strong>{task?.name}</p>
        <p><strong>Created: </strong>{task ? getCreatedDate(task.date) : ""}</p>
      </div>

      {/* Add Step */}
      <div className="mt-6">
        <div className="flex items-center">
          <IconButton color="inherit" onClick={() => { /* Add step logic */ }}>
            <AddIcon />
          </IconButton>
          <p className="font-bold">Add Step</p>
        </div>
      </div>

      {/* Set Reminder */}
      <div className="mt-6">
        <div className="flex items-center">
          <IconButton color="inherit" onClick={() => { /* Set reminder logic */ }}>
            <NotificationsIcon />
          </IconButton>
          <p className="font-bold">Set Reminder</p>
        </div>
      </div>

      {/* Add Due Date */}
      <div className="mt-6">
        <div className="flex items-center">
          <IconButton color="inherit" onClick={() => { /* Add due date logic */ }}>
            <EventIcon />
          </IconButton>
          <p className="font-bold">Add Due Date</p>
        </div>
      </div>

      {/* Set Repeat */}
      <div className="mt-6">
        <div className="flex items-center">
          <IconButton color="inherit" onClick={() => setRepeat(!repeat)}>
            <RepeatIcon />
          </IconButton>
          <p className="font-bold">Repeat</p>
        </div>
      </div>

      {/* Footer: Delete and Cancel */}
      <div className="absolute bottom-4 left-4 flex items-center w-full sm:space-x-10">
        <p className="text-sm">
          Created: {getCreatedDate(task.date)}
        </p>
        <IconButton onClick={handleDeleteTask} color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskEditSidebar;
