import axios from "axios";
import { User } from "../slices/authSlice";

const URL = "http://localhost:4005/api/users";

const register = async (userData: User) => {
  const { data } = await axios.post(`${URL}/register`, userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const login = async (userData: User) => {
  const { data } = await axios.post(`${URL}/login`, userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const logout = () => localStorage.removeItem("user");

const authService = {
  register,
  login,
  logout,
};

export default authService;
