import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlay,
  FaCheckCircle,
} from "react-icons/fa"; // Font Awesome icons

const getMillisecondsFromEstimatedTime = (estimatedTime) => {
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

  // Tailwind priority badge color
  const priorityColor = {
    HIGH: "bg-red-100 text-red-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    LOW: "bg-green-100 text-green-800",
  };

  return (
    <div
      key={todo.id}
      className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 shadow-sm flex justify-between gap-4 min-h-[140px]"
    >
      {/* Left: Content */}
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">#{index + 1}</div>

        <div className="flex flex-wrap gap-2 items-center mb-2 text-xs">
          <span className={`px-2 py-1 rounded-full ${priorityColor[todo.priority]}`}>
            {todo.priority}
          </span>
          <span>⏱ {todo.estimatedTime}h</span>
          <span>🟢 {todo.status}</span>
          {todo.status === "In Progress" && timeLeft > 0 && (
            <span className="text-indigo-500">⏳ {formatTimeLeft(timeLeft)}</span>
          )}
        </div>

        {todo.isEditing ? (
          <>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
              value={todo.editTitle}
              onChange={(e) =>
                handleEditChange(todo.id, "editTitle", e.target.value)
              }
            />
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm mb-2"
              value={todo.editDescription}
              onChange={(e) =>
                handleEditChange(todo.id, "editDescription", e.target.value)
              }
            />
            <button
              onClick={() =>
                handleSaveEdit(todo.id, todo.editTitle, todo.editDescription)
              }
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold mb-1">{todo.title}</h3>
            <p className="text-sm text-gray-700">{todo.description}</p>
          </>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex flex-col gap-2 items-center justify-start mt-1">
        {!todo.isEditing && (
          <button onClick={() => handleStartEdit(todo.id)} title="Edit">
            <FaEdit className="text-blue-600 hover:text-blue-800" />
          </button>
        )}
        <button onClick={() => handleDeleteTodo(todo.id)} title="Delete">
          <FaTrash className="text-red-500 hover:text-red-700" />
        </button>
        {todo.status === "Not Started" && (
          <button onClick={() => handleStartTask(todo.id)} title="Start">
            <FaPlay className="text-teal-600 hover:text-teal-800" />
          </button>
        )}
        {todo.status === "In Progress" && (
          <button onClick={() => handleFinishTask(todo.id)} title="Finish">
            <FaCheckCircle className="text-green-600 hover:text-green-800" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
