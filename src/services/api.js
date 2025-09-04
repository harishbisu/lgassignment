import axios from "axios";

const API_BASE = "http://localhost:3000";

export const trackEmail = async (subject) => {
  const res = await axios.get(`${API_BASE}/emails/${subject}`);
  return res.data;
};
