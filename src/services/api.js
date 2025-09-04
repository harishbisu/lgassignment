import axios from "axios";

const API_BASE = "https://lgassign-backend.onrender.com";

export const trackEmail = async (subject) => {
  const res = await axios.get(`${API_BASE}/emails/${subject}`);
  return res.data;
};
