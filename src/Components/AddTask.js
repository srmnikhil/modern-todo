// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton, Checkbox } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RepeatIcon from "@mui/icons-material/Repeat";
import { addTask } from "../redux/taskSlice"; // Import addTask action

const AddTask = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isMenuOpen = useSelector((state) => state.sidebar.isMenuOpen);
  const dispatch = useDispatch(); // Access the dispatch function from Redux
  const [task, setTask] = useState(""); // State to hold the task input
  const [error, setError] = useState(false); // State to track input validation
  const [goOutside, setGoOutside] = useState(false); // State for "Go Outside" checkbox

  // Retrieve username and city from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "Unknown User";
  const city = user?.city || "Unknown City";

  // Load "Go Outside" status from localStorage on component mount
  useEffect(() => {
    const savedGoOutside = localStorage.getItem("goOutside") === "true"; // Retrieve from localStorage
    setGoOutside(savedGoOutside); // Set the state based on the saved value
  }, []);

  // Function to handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(false); // Reset error if input is not empty
    }
  };

  // Function to handle Add Task button click
  const handleAddTask = () => {
    if (task.trim() === "") {
      setError(true); // Show error if input is empty
    } else {
      const newTask = {
        id: Date.now(), // Generate a unique ID based on the current timestamp
        name: task,
        completed: false,
        isStarred: false,
        date: new Date(Date.now()).toLocaleDateString(),
        goOutside, // Save the "Go Outside" status with the task
        username, // Add username to the task
        city, // Add city to the task
      };
      dispatch(addTask(newTask)); // Dispatch the addTask action to Redux
      setTask(""); // Clear the input field
      setGoOutside(false); // Reset "Go Outside" checkbox
      localStorage.removeItem("goOutside"); // Clear from localStorage
      alert("Task added successfully!");
    }
  };

  // Handle "Go Outside" checkbox change and save to localStorage
  const handleGoOutsideChange = (e) => {
    const isChecked = e.target.checked;
    setGoOutside(isChecked);
    localStorage.setItem("goOutside", isChecked); // Save to localStorage
  };

  // Placeholder for button clicks
  const handleReminderClick = () => {
    alert("Reminder clicked");
  };

  const handleCalendarClick = () => {
    alert("Calendar clicked");
  };

  const handleRepeatClick = () => {
    alert("Repeat clicked");
  };

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask(); // Call handleAddTask when Enter is pressed
    }
  };

  return (
    <div className="flex">
      <div className={`relative w-full h-[10rem] bg-white`}>
        {/* Input Box */}
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add event listener for "Enter" key press
          placeholder="Add A Task"
          className={`w-full h-full pl-6 pr-16 pt-2 pb-8 border-t-2 border-b-2 focus:outline-none ${isDarkMode
              ? "bg-darkInputBackground border-emerald-900"
              : "bg-gradient-to-b from-[#F6FDF7] to-[#E8F0E9] border-grey"
            } ${error ? "border-red-500" : ""}`} // Apply red border if there's an error
        />

        {/* Error Message */}
        {error && (
          <p
            className={`text-red-500 text-sm absolute top-[0.5rem] left-[50%] translate-x-[-50%]`}
          >
            Task cannot be empty
          </p>
        )}

        {/* Reminder, Calendar, Repeat Buttons */}
        <div className={`absolute ${isMenuOpen ? "top-2 sm:top-auto sm:bottom-2" : "bottom-2"} left-2 flex`}>
          <IconButton
            onClick={handleReminderClick}
            variant="contained"
            color="inherit"
            className="rounded-full"
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            onClick={handleCalendarClick}
            variant="contained"
            color="inherit"
            className="rounded-full"
          >
            <EventIcon />
          </IconButton>
          <IconButton
            onClick={handleRepeatClick}
            variant="contained"
            color="inherit"
            className="rounded-full"
          >
            <RepeatIcon />
          </IconButton>
          <Checkbox
            checked={goOutside}
            onChange={handleGoOutsideChange}
            color="primary"
            inputProps={{ "aria-label": "Go Outside" }}
          />
          <span className="text-sm flex items-center">Go Outside</span>
        </div>

        {/* Add Task Button */}
        <div className="absolute bottom-4 right-4">
          <Button
            onClick={handleAddTask}
            variant="contained"
            sx={{
              backgroundColor: isDarkMode ? "#357937" : "#CEDFCF",
              color: isDarkMode ? "#CEDFCF" : "#357937",
              "&:hover": {
                backgroundColor: isDarkMode ? "#2b5d2d" : "#b8d7b8", // Slightly darker for hover
              },
            }}
            className="rounded-full"
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;