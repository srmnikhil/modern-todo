import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function Login({ setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState(""); // State for city input

  const handleLogin = (evt) => {
    evt.preventDefault();
    if (!name || !username || !city) {
      toast.error("Please fill in all fields!");
      return;
    }
    const user = { name, username, city }; // Include city in user details
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    toast.success("Login successful! Refresh to see the app.");
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: { md: "25vw", sm: "50vw", xs: "80vw" },
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="City" // Label for the city input
            type="text"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Update state on change
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <ToastContainer position="bottom-right" />
    </Container>
  );
}

export default Login;
