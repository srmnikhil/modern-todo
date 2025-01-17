import React, { useState } from "react";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import {
  Assignment as AssignmentIcon,
  CalendarToday as CalendarTodayIcon,
  StarBorder as StarBorderIcon,
  CheckCircle as CheckCircleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import CircularChart from "./CircularChart"

const MenuSidebar = ({ onFilterChange }) => {
  const isMenuOpen = useSelector((state) => state.sidebar.isMenuOpen); // Access sidebar state
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onFilterChange(item);
  };

  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const userName = storedUser.name || "User";  // Fallback to "User" if no name is found

  return (
    <div className="bg-transparent relative min-h-screen">
      <div
        className={`absolute top-16 left-0 sm:w-[25vw] w-[40vw] transition-transform ${isMenuOpen ? "translate-x-4" : "-translate-x-[calc(100%+1rem)]"
          } ${isDarkMode ? "bg-darkSideBackground text-white" : "bg-lightSideBackground text-black"
          }`}
      >
        {/* Sidebar content */}
        <div className="p-6">
          {/* User Section */}
          <div className="relative flex flex-col items-center">
            {/* Circular Photo/Icon */}
            <div className="absolute -top-24 bg-white rounded-full flex items-center justify-center w-[8rem] aspect-square shadow-lg">
              <PersonIcon style={{ fontSize: "6rem", color: "grey" }} /> {/* Icon size */}
            </div>  
            {/* Spacing for Circle */}
            <div className="mt-10 text-lg font-semibold text-center">Hello, {userName}</div> {/* Dynamically display user name */}
          </div>

          {/* Cards Section */}
          <div className={`space-y-2 mt-2`}>
            <div
              className={`${isDarkMode ? "bg-darkBackground" : "bg-lightBackground"} shadow-lg pt-2 pb-2`}
            >
              <ul>
                {/* All Tasks */}
                <li
                  className={`flex items-center space-x-2 cursor-pointer pt-1 pb-1 pl-2 pr-2 rounded-md transition-all duration-200 
            ${selectedItem === "allTasks"
                      ? isDarkMode
                        ? "bg-[#263126] text-[#98E19B]"
                        : "bg-[#DBE8DD] text-[#357937]"
                      : isDarkMode
                        ? "hover:bg-[#263126] hover:text-[#98E19B]"
                        : "hover:bg-[#DBE8DD] hover:text-[#357937]"}
          `}
                  onClick={() => handleItemClick("allTasks")}
                >
                  <CheckCircleIcon className="text-xl" />
                  <span>All Tasks</span>
                </li>

                {/* Today */}
                <li
                  className={`flex items-center space-x-2 cursor-pointer pt-1 pb-1 pl-2 pr-2 rounded-md transition-all duration-200 
            ${selectedItem === "today"
                      ? isDarkMode
                        ? "bg-[#263126] text-[#98E19B]"
                        : "bg-[#DBE8DD] text-[#357937]"
                      : isDarkMode
                        ? "hover:bg-[#263126] hover:text-[#98E19B]"
                        : "hover:bg-[#DBE8DD] hover:text-[#357937]"}
          `}
                  onClick={() => handleItemClick("today")}
                >
                  <CalendarTodayIcon className="text-xl" />
                  <span>Today</span>
                </li>

                {/* Important */}
                <li
                  className={`flex items-center space-x-2 cursor-pointer pt-1 pb-1 pl-2 pr-2 rounded-md transition-all duration-200 
            ${selectedItem === "important"
                      ? isDarkMode
                        ? "bg-[#263126] text-[#98E19B]"
                        : "bg-[#DBE8DD] text-[#357937]"
                      : isDarkMode
                        ? "hover:bg-[#263126] hover:text-[#98E19B]"
                        : "hover:bg-[#DBE8DD] hover:text-[#357937]"}
          `}
                  onClick={() => handleItemClick("important")}
                >
                  <StarBorderIcon className="text-xl" />
                  <span>Important</span>
                </li>

                {/* Planned */}
                <li
                  className={`flex items-center space-x-2 cursor-pointer pt-1 pb-1 pl-2 pr-2 rounded-md transition-all duration-200 
            ${selectedItem === "planned"
                      ? isDarkMode
                        ? "bg-[#263126] text-[#98E19B]"
                        : "bg-[#DBE8DD] text-[#357937]"
                      : isDarkMode
                        ? "hover:bg-[#263126] hover:text-[#98E19B]"
                        : "hover:bg-[#DBE8DD] hover:text-[#357937]"}
          `}
                  onClick={() => handleItemClick("planned")}
                >
                  <CalendarTodayIcon className="text-xl" />
                  <span>Planned</span>
                </li>

                {/* Assigned to Me */}
                <li
                  className={`flex items-center space-x-2 cursor-pointer pt-1 pb-1 pl-2 pr-2 rounded-md transition-all duration-200 
            ${selectedItem === "assignedToMe"
                      ? isDarkMode
                        ? "bg-[#263126] text-[#98E19B]"
                        : "bg-[#DBE8DD] text-[#357937]"
                      : isDarkMode
                        ? "hover:bg-[#263126] hover:text-[#98E19B]"
                        : "hover:bg-[#DBE8DD] hover:text-[#357937]"}
          `}
                  onClick={() => handleItemClick("assignedToMe")}
                >
                  <AssignmentIcon className="text-xl" />
                  <span>Assigned to Me</span>
                </li>
              </ul>
            </div>
            <div className={`${isDarkMode ? "bg-darkBackground" : "bg-lightBackground"} shadow-lg pt-2 pb-2`}>
              <ul>
                <li
                  className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-all duration-200 
            ${isDarkMode
                      ? "hover:bg-[#263126] hover:text-[#98E19B]"
                      : "hover:bg-[#DBE8DD] hover:text-[#357937]"}
          `}
                  onClick={() => alert("Clicked on Add List")}
                >
                  <AddIcon className="text-xl" />
                  <span>Add List</span>
                </li>
              </ul>
            </div>
            <div className={`${isDarkMode ? "bg-darkBackground" : "bg-lightBackground"} shadow-lg`}>
              <CircularChart filter="today"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
