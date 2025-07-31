import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

const priorities = ["LOW", "MEDIUM", "HIGH"];

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [estimatedTime, setEstimatedTime] = useState("");

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
        status: todo.status || "Not Started",
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
    <div className="flex flex-col md:flex-row gap-6 p-6 w-full">
      {/* Form Section */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 p-2 rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 p-2 rounded mb-3"
          value={priority}
          onChange={(e) => setPriority(e.target.value.toUpperCase())}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0) + p.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Estimated Time (hrs)"
          className="w-full border border-gray-300 p-2 rounded mb-3"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
        />

        <button
          onClick={handleAddTodo}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List Section */}
      <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow-md max-h-[80vh] overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-gray-500">No tasks available</p>
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
      </div>
    </div>
  );
};

export default TodoList;
