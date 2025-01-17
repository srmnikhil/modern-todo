import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import MenuSidebar from "./Components/MenuSidebar";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import TaskEditSidebar from "./Components/TaskEditSidebar";
import { openSidebar, closeSidebar } from "./redux/taskEditSidebarSlice";
import Login from "./Components/Login"; // Import the Login component
import { fetchWeather } from './redux/weatherSlice';

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const isMenuOpen = useSelector((state) => state.sidebar.isMenuOpen);
  const { isSidebarOpen, taskId } = useSelector((state) => state.taskEditSidebar);
  const [selectedFilter, setSelectedFilter] = useState("allTasks");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get weather state from Redux
  const weather = useSelector((state) => state.weather);
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const city = storedUser.city || "New Delhi"; // Default city

  // Fetch weather data when the component mounts
  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city)); // Dispatch fetchWeather action with the city
    }
  }, [dispatch, city]);

  useEffect(() => {
    // Check if a user object exists in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleTaskClick = (taskId) => {
    dispatch(openSidebar(taskId));
  };

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-darkBackground text-white" : "bg-lightBackground text-black"}`}
    >
      <Header />
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div className="relative mt-2 flex">
          {/* Sidebar */}
          <MenuSidebar onFilterChange={handleFilterChange} />

          {/* Main Content */}
          <div
            className={`relative transition-all duration-300 top-0 ${isMenuOpen && isSidebarOpen
              ? "sm:left-[calc(25vw+2rem)] left-[calc(40vw+2rem)] lg:w-[48vw] sm:w-[33vw] sm:block hidden"
              : isMenuOpen
                ? "sm:left-[calc(25vw+2rem)] left-[calc(40vw+2rem)] lg:w-[70vw] sm:w-[68vw]"
                : isSidebarOpen
                  ? "left-[1rem] lg:w-[74vw] w-[60vw]"
                  : "left-[1rem] lg:w-[95vw] md:w-[95vw] w-[90vw]"
              } w-[45vw]`}
          >
            <AddTask />

            {/* Display Weather Information */}
            <p className="mt-4">
              {weather.loading && "Loading weather data..."}
              {weather.error && `Error fetching weather: ${weather.error}`}
              {weather.data && `Latest Weather Condition of ${weather.data.location.name} is ${weather.data.current.temp_c}°C, ${weather.data.current.condition.text}, Last Updated: ${weather.data.current.last_updated}`}
            </p>

            <TaskList filter={selectedFilter} onTaskClick={handleTaskClick} />
          </div>
        </div>
      )}
      {isAuthenticated && isSidebarOpen && (
        <TaskEditSidebar taskId={taskId} onClose={handleCloseSidebar} />
      )}
    </div>
  );
};

export default App;
