import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link,
} from "@mui/material";

const LoginForm = ({ setView, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8081/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      alert("Login successful");
      setView("todo");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, mt: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{ mt: 1 }}
          >
            Login
          </Button>
          <Typography align="center" mt={2}>
            Don't have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => setView("register")}
              underline="hover"
            >
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
