import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toggleTaskCompletion, removeTask, toggleStar } from "../redux/taskSlice";

const TaskList = ({ filter, onTaskClick }) => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.viewMode.viewMode); // Fetching view mode from Redux
  const tasks = useSelector((state) => state.tasks.tasks) || []; // Ensure tasks is always an array
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Fetching dark mode from Redux

  // Retrieve logged-in user's username from localStorage
  const loggedInUsername = JSON.parse(localStorage.getItem('user'))?.username;

  // Filter tasks based on the selected filter
  let filteredTasks = tasks;

  // Filter tasks to match the logged-in username
  filteredTasks = filteredTasks.filter((task) => task.username === loggedInUsername);

  // Handle different filters
  if (filter === "today") {
    // Get today's date in 'M/D/YYYY' format
    const today = new Date().toLocaleDateString("en-US");
  
    filteredTasks = filteredTasks.filter((task) => {
      // Normalize the stored task date to 'M/D/YYYY' format (assuming task.date is in 'M/D/YYYY' format)
      const taskDate = new Date(task.date).toLocaleDateString("en-US");
      return taskDate === today; // Compare the formatted dates
    });
  } else if (filter === "important") {
    filteredTasks = filteredTasks.filter((task) => task.isStarred); // Filter starred tasks
  } else if (filter === "planned") {
    filteredTasks = filteredTasks.filter((task) => task.goOutside); // Filter planned tasks
  }

  // Separate and sort tasks into pending and completed tasks
  const pendingTasks = filteredTasks
    .filter((task) => !task.completed)
    .sort((a, b) => b.isStarred - a.isStarred); // Starred tasks appear first
  const completedTasks = filteredTasks
    .filter((task) => task.completed)
    .sort((a, b) => b.isStarred - a.isStarred); // Starred completed tasks appear first

  // Task completion handler
  const handleTaskCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  // Task deletion handler
  const handleDeleteTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  // Task star toggle handler
  const handleStarClick = (taskId) => {
    dispatch(toggleStar(taskId));
  };

  // Render task as a list item or card based on the viewMode
  const renderTask = (task) => {
    return (
      <div
        key={task.id}
        className={`flex items-center justify-between p-4 my-2 ${
          viewMode === "card" ? "border rounded-lg" : "border-b"
        }`}
        onClick={() => onTaskClick(task.id)} // Notify parent (App) to open the sidebar
      >
        <div className="flex items-center">
          <Checkbox
            checked={task.completed}
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering `onTaskClick`
            }}
            onChange={() => handleTaskCompletion(task.id)}
            disabled={task.completed} // Disable checkbox once marked as done
            sx={{
              color: task.completed ? "green" : isDarkMode ? "white" : "default", // Color for unchecked state
              "&.Mui-checked": {
                color: "green", // Color when checked
              },
            }}
          />
          <span className={task.completed ? "line-through" : ""}>
            {task.name}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <IconButton
            color="inherit"
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering `onTaskClick`
              handleStarClick(task.id);
            }}
          >
            {task.isStarred ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering `onTaskClick`
              handleDeleteTask(task.id);
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  return (
    <div className="task-list-container">
      {/* Pending Tasks */}
      <div
        className="task-list pending-tasks"
        style={{
          maxHeight: "300px", // Set a fixed height for the container
          overflowY: "auto", // Allow scrolling when content overflows
        }}
      >
        {pendingTasks.length === 0 ? (
          <p>No pending tasks available</p>
        ) : (
          pendingTasks.map(renderTask)
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div
          className="task-list completed-tasks mt-4"
          style={{
            maxHeight: "300px", // Set a fixed height for the container
            overflowY: "auto", // Allow scrolling when content overflows
          }}
        >
          <p className="font-bold">Completed:</p>
          {completedTasks.map(renderTask)}
        </div>
      )}
    </div>
  );
};

export default TaskList;