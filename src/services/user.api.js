import API from "../api/axios";

export const registerUser = async (userData) => {
  const response = await API.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/users/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get("/users/me");
  return response.data;
};
