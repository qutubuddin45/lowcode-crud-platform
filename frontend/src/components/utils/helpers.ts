import axios from "axios";
import { API_BASE_URL } from "./constants";

// ✅ Axios instance with token support
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// 🔒 Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
   console.log("🟢 Sending token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Fetch all models (e.g., ["Product", "User", "Order"])
export async function fetchModels() {
  // fetch() use karne ki jagah axiosClient use karo
  const res = await api.get("/models");
  return res.data;
}

// ✅ Fetch records for given model
export async function fetchRecords(model: string) {
  const res = await api.get(`/${model.toLowerCase()}`);
  return res.data;
}

// ✅ Create new record
export async function createRecord(model: string, data: any) {
  const res = await api.post(`/${model.toLowerCase()}`, data);
  return res.data;
}

// ✅ Delete record by ID
export async function deleteRecord(model: string, id: number) {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/${model.toLowerCase()}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}


// ✅ Update record by ID
export async function updateRecord(model: string, id: number, data: any) {
  const token = localStorage.getItem("token");
  const res = await api.put(`/${model.toLowerCase()}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
