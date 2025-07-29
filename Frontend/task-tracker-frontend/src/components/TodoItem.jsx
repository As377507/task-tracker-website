
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import { Delete, Edit, PlayArrow, CheckCircle } from "@mui/icons-material";

const getMillisecondsFromEstimatedTime = (estimatedTime) => {
  if (!estimatedTime) return null;
  const hours = parseFloat(estimatedTime);
  if (isNaN(hours)) return null;
  return hours * 60 * 60 * 1000;
};

const formatTimeLeft = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

const TodoItem = ({
  todo,
  index,
  handleEditChange,
  handleSaveEdit,
  handleStartEdit,
  handleDeleteTodo,
  handleStartTask,
  handleFinishTask,
}) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (todo.status === "In Progress") {
      const ms = getMillisecondsFromEstimatedTime(todo.estimatedTime);
      if (ms && todo.startTime) {
        const elapsed = Date.now() - new Date(todo.startTime).getTime();
        const remaining = ms - elapsed;
        if (remaining > 0) {
          setTimeLeft(remaining);
        }
      }
    }
  }, [todo.status, todo.estimatedTime, todo.startTime]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <Box
      key={todo.id}
      mb={2}
      p={2}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
          minHeight: "140px",           // Set a base height
          maxWidth: "100%",             // Responsive width
          backgroundColor: "#f9f9f9",   // Optional: background color
          boxShadow: 1,                 // Optional: soft shadow
      }}
    >
      <Box flexGrow={1}>
        <Typography variant="subtitle2" color="text.secondary">
          {index + 1}.
        </Typography>

        <Box display="flex" gap={1} alignItems="center">
          <Chip
            label={todo.priority}
            color={
              todo.priority === "High"
                ? "error"
                : todo.priority === "Medium"
                ? "warning"
                : "success"
            }
            size="small"
          />
          <Typography variant="caption">⏱ {todo.estimatedTime}</Typography>
          <Typography variant="caption">🟢 {todo.status}</Typography>

          {todo.status === "In Progress" && timeLeft !== null && timeLeft > 0 && (
            <Typography variant="caption" color="secondary">
              ⏳ {formatTimeLeft(timeLeft)}
            </Typography>
          )}
        </Box>

        {todo.isEditing ? (
          <>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              margin="dense"
              value={todo.editTitle}
              onChange={(e) =>
                handleEditChange(todo.id, "editTitle", e.target.value)
              }
            />
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              margin="dense"
              value={todo.editDescription}
              onChange={(e) =>
                handleEditChange(todo.id, "editDescription", e.target.value)
              }
            />
            <Button
              size="small"
              variant="outlined"
              onClick={() =>
                handleSaveEdit(todo.id, todo.editTitle, todo.editDescription)
              }
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography variant="body2">{todo.description}</Typography>
          </>
        )}
      </Box>

      <Box>
        {!todo.isEditing && (
          <IconButton onClick={() => handleStartEdit(todo.id)}>
            <Edit color="primary" />
          </IconButton>
        )}
        <IconButton onClick={() => handleDeleteTodo(todo.id)}>
          <Delete color="error" />
        </IconButton>
        {todo.status === "Not Started" && (
          <IconButton onClick={() => handleStartTask(todo.id)}>
            <PlayArrow color="info" />
          </IconButton>
        )}
        {todo.status === "In Progress" && (
          <IconButton onClick={() => handleFinishTask(todo.id)}>
            <CheckCircle color="success" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default TodoItem;
