import API from "../api/axios";

export const getAllTasks = async () => {
  const response = await API.get("/tasks");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (taskId, updateData) => {
  const response = await API.patch(`/tasks/${taskId}`, updateData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await API.delete(`/tasks/${taskId}`);
  return response.data;
};
