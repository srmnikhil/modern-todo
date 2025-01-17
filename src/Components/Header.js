import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { toggleMenu } from "../redux/sidebarSlice";
import { toggleViewMode } from "../redux/viewModeSlice"; // Import the viewMode action
import MenuIcon from "@mui/icons-material/Menu";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule"; // Card view icon
import logo from "../logo.svg";

const Header = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
    const viewMode = useSelector((state) => state.viewMode.viewMode); // Fetch viewMode from Redux
    const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search bar visibility

    // Check if the user is logged in
    const isAuthenticated = localStorage.getItem("user") !== null;

    return (
        <header className="flex justify-between items-center p-2">
            {/* Left Section: Menu and Logo */}
            <div className="flex items-center space-x-4">
                {/* Menu Button (only visible on small screens) */}
                <button
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    onClick={() => dispatch(toggleMenu())}
                    aria-label="Menu"
                >
                    <MenuIcon />
                </button>

                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    <img src={logo} alt="Logo" />
                </h1>
            </div>

            {/* Right Section: Icons visible only if the user is logged in */}
            {isAuthenticated && (
                <div className="flex items-center space-x-1">
                    {isSearchVisible ? (
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 rounded-md dark:bg-gray-700 dark:text-white"
                            onBlur={() => setIsSearchVisible(false)} // Hide the search bar when it loses focus
                        />
                    ) : (
                        <button
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                            onClick={() => setIsSearchVisible(true)}
                            aria-label="Search"
                        >
                            <SearchIcon />
                        </button>
                    )}

                    {/* View Mode Toggle (Card/List) */}
                    <button
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                        onClick={() => dispatch(toggleViewMode())} // Dispatch to Redux to toggle viewMode
                        aria-label="Toggle View"
                    >
                        {viewMode === "card" ? <ViewModuleIcon /> : <ViewListIcon />}
                    </button>

                    {/* Dark/Light Mode Toggle */}
                    <button
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                        onClick={() => dispatch(toggleTheme())}
                        aria-label="Toggle Theme"
                    >
                        {isDarkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
                    </button>

                    {/* Logout Button */}
                    <button
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        onClick={() => {
                            localStorage.removeItem("user"); // Clear user from localStorage
                            window.location.reload(); // Reload to update UI
                        }}
                        aria-label="Logout"
                    >
                        <LogoutIcon />
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
