

export const fetchTodos = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8081/api/todos", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return await response.json();
};
