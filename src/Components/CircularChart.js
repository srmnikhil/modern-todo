import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

const CircularChart = ({ filter }) => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const currentColors = isDarkMode ? ['#3F9142', '#A0EDA4'] : ['#3F9142', '#142E15']; // Dynamically select colors based on dark mode

  // Fetch tasks from Redux store and ensure it's always an array
  const tasks = useSelector((state) => state.tasks.tasks) || [];  // Default to empty array if tasks is undefined or null

  // Get the username from localStorage (assuming it's stored under 'user' key)
  const storedUser = JSON.parse(localStorage.getItem('user'));  // Assuming 'user' object contains 'username'

  // If username is not found in localStorage or tasks are empty, return early
  if (!storedUser || !storedUser.username) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold pt-1 pb-1 pl-2 pr-2">Username not found</div>
        <div className="text-lg pl-2">Please login to view your tasks.</div>
      </div>
    );
  }

  // Get today's date in the format 'MM/DD/YYYY' (same format as in your data)
  const today = new Date().toLocaleDateString('en-US');

  // Filter tasks based on the selected filter (and validate the username)
  let filteredTasks = tasks;

  // Handle different filters
  if (filter === 'today') {
    filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.date).toLocaleDateString('en-US');
      // Filter by both today's date and matching username
      return taskDate === today && task.username === storedUser.username; // Match both date and username
    });
  }

  // Separate and calculate pending and completed tasks
  const completedTasks = filteredTasks.filter((task) => task.completed).length;
  const pendingTasks = filteredTasks.length - completedTasks;

  // Prepare data for the chart
  const data = [
    { name: 'Pending', value: pendingTasks },
    { name: 'Completed', value: completedTasks },
  ];

  // Calculate total tasks for display
  const totalTasks = filteredTasks.length;

  return (
    <div className="flex flex-col">
      {/* Title for Today Tasks */}
      <div className="text-xl font-semibold pt-1 pb-1 pl-2 pr-2">Today Tasks</div>
      {/* Total tasks */}
      <div className="text-lg pl-2">{totalTasks} tasks</div>

      {/* Container for chart and data */}
      <div className="flex items-center justify-center">
        {/* Pie Chart */}
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}   // Adjust the inner radius for a donut shape
              outerRadius={60}   // Adjust the outer radius to reduce the chart size
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={currentColors[index % currentColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CircularChart;
