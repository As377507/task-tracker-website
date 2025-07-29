import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Paper,
  MenuItem,
  Chip,
} from "@mui/material";
import { Delete, Edit, PlayArrow, CheckCircle } from "@mui/icons-material";

const priorities = ["LOW", "MEDIUM", "HIGH"];

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [estimatedTime, setEstimatedTime] = useState(""); // In hours or "2h 30m"

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const extendedTodos = res.data.map((todo) => ({
        ...todo,
        isEditing: false,
        editTitle: todo.title,
        editDescription: todo.description,
        startTime: todo.startTime || null,
        endTime: todo.endTime || null,
        status: todo.status || "Not Started", // default
        priority: todo.priority || "MEDIUM",
        estimatedTime: todo.estimatedTime || "",
      }));

      setTodos(extendedTodos);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleAddTodo = async () => {
    if (!title || !description || !estimatedTime) {
      alert("All fields including estimated time are required");
      return;
    }

    console.log({
      title,
      description,
      priority,
      estimatedTime,
      status: "Not Started",
    });

    console.log("Priority Type:", typeof priority); // Should be string

    try {
      await axios.post(
        "http://localhost:8081/api/todos",
        {
          title,
          description,
          priority,
          estimatedTime: parseInt(estimatedTime),
          status: "Not Started",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setEstimatedTime("");
      fetchTodos();
    } catch (err) {
      alert("Failed to add todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (err) {
      alert("Error deleting task");
    }
  };

  const handleStartEdit = (todoId) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, isEditing: true } : t))
    );
  };

  const handleSaveEdit = async (id, title, description) => {
    try {
      await axios.put(
        `http://localhost:8081/api/todos/${id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodos();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const handleEditChange = (id, field, value) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, [field]: value } : todo))
    );
  };

  const handleStartTask = async (id) => {
    const startTime = new Date().toISOString();
    try {
      await axios.put(
        `http://localhost:8081/api/todos/${id}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodos();
    } catch (err) {
      alert("Error starting task");
    }
  };

  const handleFinishTask = async (id) => {
    const endTime = new Date().toISOString();
    try {
      await axios.put(
        `http://localhost:8081/api/todos/${id}/finish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTodos();
    } catch (err) {
      alert("Error finishing task");
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  return (
  <Grid container spacing={4} padding={4}>
    {/* Form Side (left) */}
    <Grid item xs={12} md={4}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add New Task
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Priority"
            select
            fullWidth
            margin="normal"
            value={priority}
            onChange={(e) => setPriority(e.target.value.toUpperCase())}
          >
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
          <TextField
            label="Estimated Time (in hours)"
            type="number"
            fullWidth
            margin="normal"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddTodo}
            sx={{ mt: 2 }}
          >
            Add Task
          </Button>
        </CardContent>
      </Card>
    </Grid>

    {/* Task List Side (right) */}
    <Grid item xs={12} md={4}>
      <Paper
        elevation={3}
        sx={{
          maxHeight: "80vh",
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {todos.length === 0 ? (
          <Typography>No tasks available</Typography>
        ) : (
          todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              index={index}
              handleEditChange={handleEditChange}
              handleSaveEdit={handleSaveEdit}
              handleStartEdit={handleStartEdit}
              handleDeleteTodo={handleDeleteTodo}
              handleStartTask={handleStartTask}
              handleFinishTask={handleFinishTask}
            />
          ))
        )}
      </Paper>
    </Grid>
  </Grid>
);

};

export default TodoList;
